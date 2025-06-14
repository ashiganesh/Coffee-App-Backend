const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
   email : String,
   password : String,
   otp: String,
   otpExpires: Date
})

const data = mongoose.model('User',userschema);
module.exports = data;

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   otp: String,
//   otpExpires: Date
// });

// module.exports = mongoose.model('User', userSchema);
