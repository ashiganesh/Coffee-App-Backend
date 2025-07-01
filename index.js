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
  cloud_name: dsx5f8jzm,
  api_key: 665234862273299,
  api_secret: yf7wULxJFo1MU98mhdKGwJsJP4g,
});
app.use("/",router);
//app.use('/uploads', express.static('uploads'));

app.listen(process.env.PORT || 3000,()=>{
console.log(`server running in port number ${process.env.PORT}`)
})