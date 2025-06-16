// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: String,
  description: String,
  file: [
  {
  filename: String,
  originalName: String,
  path: String,
  mimetype: String,
  size: Number,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now }
}]});

const information = mongoose.model('File', fileSchema);

module.exports = information;
