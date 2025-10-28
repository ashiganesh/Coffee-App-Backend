// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   url: String,
//   price:Number,
//   category: String,
// //   file: [
// //   {
// //   filename: String,
// //   originalName: String,
// //   path: String,
// //   mimetype: String,
// //   size: Number,
//  //  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// //   uploadedAt: { type: Date, default: Date.now }
// // }]


 name: { type: String, required: true },
  hashtag: { type: String },
  catrgory: { type: String },
  description: { type: String },
    image: { type: String },
  //price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: String },
  sizes: [{ type: String }],
  productDetails: { type: String },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },

});

const information = mongoose.model('File', fileSchema);

module.exports = information;


