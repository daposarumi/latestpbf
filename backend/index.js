const port = 4000;
import express from "express"
const app = express();
import bodyParser from "body-parser";
import mongoose from "mongoose"
// const jwt = require("jsonwebtoken")
import multer from "multer"
// const path = require("path");
import axios from 'axios';
import cors from "cors"
import { connectDB } from "./config/db.js";
import dressRouter from "./routes/DressRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import searchRouter from "./routes/searchRoute.js";
import dotenv from 'dotenv';
dotenv.config();


app.use(express.json());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json())

// database connection
connectDB();

//api endpoints

app.use("/api/dress",dressRouter)
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/items",searchRouter)


// API creation

app.get("/",(req,res)=>{
    res.send("Express App is running")
})





app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
  
    try {
      // Example: Add to Mailchimp list or save to database
      // await addEmailToMailchimpList(email);
  
      res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
      console.error('Subscription error:', error.message);
      res.status(500).json({ message: 'Subscription failed. Please try again later.' });
    }
  });
  



app.listen(port,(error)=>{
    if (!error){
        console.log("Server running on Port "+port)
    }
    else{
        console.log("Error : "+error)
    }
})