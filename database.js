const mongoose = require('mongoose');

const data = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB is connected to the server"))
}

module.exports = data;