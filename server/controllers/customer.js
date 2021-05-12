const Customer = require('../models/Customer')
const User = require('../models/User')

exports.createCustomer = async (req, res) => {

    const  { name } = req.body
    try {
        const newCustomer = await Customer.create({
            name
        })

        return res.json(newCustomer)
    } catch (error) {
        throw error
    }
}

exports.getCustomers = async (req, res) => {

    const  { name } = req.body
    try {
        const customers = await Customer.find({})
        res.json({customers})
    } catch (error) {
        throw error
    }
}

exports.addMovie = async (req, res) => {

    const { email, movieName, movie_id } = req.body
    const user = await User.findOne({ email }).lean()

}