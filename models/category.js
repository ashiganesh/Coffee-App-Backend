const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({



 category: { type: String, required: true },
  image: { type: String },
  

});

const categorySection = mongoose.model('Category', fileSchema);

module.exports = categorySection;


