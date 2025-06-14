const bcrypt = require('bcryptjs');
const data = require('../models/users');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:"ashiganesh352@gmail.com",
    pass: "mfsipcbbrvcjsmbo"
  },
});

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await data.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new data({ email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await data.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message ,
     
    });
  }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await data.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not registered' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    await transporter.sendMail({
      to: email,
      subject: 'Reset Password OTP',
      html: `<h3>Your OTP is: ${otp}</h3>`,
    });

    res.json({ message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await data.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    res.json({ message: 'OTP verified' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};