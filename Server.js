import express from  'express'
import dotenv from "dotenv"
import morgan from 'morgan'
import connectdb from './config/db.js'
 import authRoute from './routes/authRoute.js'
 import catagoryRoutes from './routes/catagoryRoutes.js'
 import productRoutes from './routes/productRoutes.js'



import cors from 'cors'
 // configer env
dotenv.config()

// database config
connectdb()

// rest object
const app=express()

// middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/category",catagoryRoutes)
app.use("/api/v1/product",productRoutes)

// rest api
app.get("/",(req,res)=>{
    res.send('<h1>hello</h1>')
})

// PORT
const PORT=process.env.PORT||8080

app.listen(PORT,()=>{
    console.log(`server running on localhost:${PORT}`)
})