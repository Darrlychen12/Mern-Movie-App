const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoute = require('./routes/auth')
const customerRoute = require('./routes/customer')
const favorites = require('./routes/favorites')
dotenv.config({ path: './config/config.env' });
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors({ 
    credentials: true,
    origin: 'http://localhost:3000',
}))
app.use(express.urlencoded({ extended: true }))
app.use('/auth', authRoute)
app.use('/customer', customerRoute)
app.use('/favorite', favorites)

//Connect to mongoDB
connectDB()


//Starting Server
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))