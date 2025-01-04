import mongoose from 'mongoose'
import { type } from 'os';

const signupSchema = new mongoose.Schema({
    Name:{
        type:String,
        required: true
    },
    Username:{
        type:String,
        required: true
    },
    Email:{
        type:String,
        required: true
    },
    Password:{
        type:String,
        required: true
    },
    Friends: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
})

const User =  mongoose.model('User', signupSchema)

export default User;