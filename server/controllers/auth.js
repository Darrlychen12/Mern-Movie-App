const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { email, password: plainTextPassword } = req.body 
 
    
    //check for valid email
    if(!email || !plainTextPassword) {
        return res.json({
            status: 'emptyFieldError',
            error: 'Please fill out all required fields'
        })
    }

    //check for password length (min: 6)
    if(plainTextPassword.length <= 6) { 
        return res.json({ 
            status: 'passwordLengthError',
            error: 'Password must be of length 6'
        })
    }

    const salt = await bcrypt.genSalt()
    const password  = await bcrypt.hash(plainTextPassword, salt)

    try {
        const response = await User.create({
            email,
            password
        })
        
        const token = jwt.sign(
			{
				id: response._id,
				email: response.email
			},
			process.env.JWT_SECRET
		)
        console.log('User created successfully', response)
        // res.header('Content-Type', 'application/json;charset=UTF-8')
        // res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        // res.header("Access-Control-Allow-Origin", "http://localhost:5000");
        // res.header('Access-Control-Allow-Credentials', 'true')
        // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    
        // localStorage.setItem('userID', user._id);
		return res.cookie("token", token, {
            //prevents client from interacting with cookie
            httpOnly: true,
            sameSite: 'strict',
            expires: false
        }).json(response._id).send()
    } catch (error) {
        if(error.code === 11000 ) {
            //duplicate key
            return res.json({ status: 'duplicateError', error:'Email already in use'})
        }
        throw error
    }
}

exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body
        const user = await User.findOne({ email }).lean()

        if(!email && !password) {
            return res.json({
                status: 'emptyFieldError',
                error: 'Please fill out all required fields'
            })
        }

        if (!user) {
            return res.json({ status: 'loginError', error: 'Invalid email/password' })
        }

        const passwordCorrect = await bcrypt.compare(password, user.password)
            // the email, password combination is successful
        if(!passwordCorrect){
           return res.json({ status: 'loginError', error: 'Invalid email/password' })
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET
        )
        return res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'strict',
            expires: false,
        }).json(user._id).send()
        
    } catch (error) {
        throw error
    }

}

exports.logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
}

exports.loggedin = (req, res) => {

    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);
    
        jwt.verify(token, process.env.JWT_SECRET);
    
        res.send(true);
      } catch (err) {
        res.json(false);
      }
    
}
