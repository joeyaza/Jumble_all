var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  title: String,
  articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]
  images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}]
  videos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Video'}]
});

module.exports = mongoose.model('Category', categorySchema);
