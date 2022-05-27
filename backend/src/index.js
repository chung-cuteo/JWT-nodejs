const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authRoute = require('./routers/auth')

const app = express()

//mongoose
mongoose.connect(process.env.MONGOOSEDB_URL, ()=>{
  console.log('connected mongoose db')
})

//midw
app.use(cors())
app.use(cookieParser())
app.use(express.json())

//routers
app.use('/api/auth', authRoute)

app.listen(8000, ()=> {
  console.log('server is running')
})
