var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  title: String,
  article_url: String,
  publication_date: Date
});

module.exports = mongoose.model('Article', articleSchema);