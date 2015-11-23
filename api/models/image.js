var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  title: String,
  image_url: String,
  category: String
});

module.exports = mongoose.model('Image', imageSchema);
