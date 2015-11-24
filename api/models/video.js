var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  title: String,
  video_url: String,
  category: String,
  published_at: Date
});

module.exports = mongoose.model('Video', videoSchema);
