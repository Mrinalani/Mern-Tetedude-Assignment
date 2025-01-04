import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import SignupRoute from './router/SignupRoute.js'
const app = express()

app.use(express.json());
app.use(cors())
app.use(SignupRoute)
console.log("jdjvdfjvhjbfhd")
mongoose.connect("mongodb://localhost:27017").then(()=>{
    app.listen(3000,()=>{
        console.log("app listning in port 3000")
    })
})
