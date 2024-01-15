// const mongoose = require('mongoose')
// const env = require('dotenv').config();
// const password = process.env.PASSWORD;

// const connectDB = async () => {

//     mongoose.connect(`mongodb+srv://oindrilabanerjee:${password}@cluster-todolist.4swygp3.mongodb.net/?retryWrites=true&w=majority`)
//   .then(()=>{
//     console.log("Connected to MongoDB");
//   })
//   .catch(()=>{
//     console.log("Couldn't connect to MongoDB");
//   })
// }

// module.exports = connectDB;


import mongoose from "mongoose"
import { mongoDBURL } from "../config/config.js"



export const connect = async () => {
   try{
    await mongoose.connect(mongoDBURL)
    console.log("Connected to MongoDB");
   } catch(e) {
    console.log("Error connecting to mongo db")
   }
}