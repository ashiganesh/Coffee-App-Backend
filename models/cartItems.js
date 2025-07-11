const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  


    name: String,
  description: String,
  url: String,
  
//   {
//   filename: String,
//   originalName: String,
//   path: String,
//   mimetype: String,
//   size: Number,
//   uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   uploadedAt: { type: Date, default: Date.now }
// }
price:Number,
size:String,
quantity:Number,
uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const cartitems = mongoose.model('cartitems', cartSchema);

module.exports = cartitems;
