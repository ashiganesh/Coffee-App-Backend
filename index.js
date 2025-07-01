const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./Routes/authRoutes');
const data = require('./database');
const cloudinary = require('cloudinary').v2;

//const path = require('path');

const app = express();

app.use(express.json());

 
data();
cloudinary.config({
  cloud_name:CLOUDINARY_CLOUD_NAME,
  api_key:CLOUDINARY_API_KEY,
  api_secret:CLOUDINARY_API_SECRET
});
app.use("/",router);
//app.use('/uploads', express.static('uploads'));

app.listen(process.env.PORT || 3000,()=>{
console.log(`server running in port number ${process.env.PORT}`)
})