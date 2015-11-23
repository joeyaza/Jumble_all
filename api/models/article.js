var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  title: String,
  url: String,
  publicationDate: Date
});

module.exports = mongoose.model('Article', articleSchema);