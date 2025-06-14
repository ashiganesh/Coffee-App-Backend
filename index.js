const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routes/authRoutes');
const data = require('./database');
require('dotenv').config();
const app = express();

app.use(express.json());

 
data();
app.use("/",router);

app.listen(process.env.PORT || 3000,()=>{
console.log(`server running in port number ${process.env.PORT}`)
})