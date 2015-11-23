var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  title: String,
  video_url: String
});

module.exports = mongoose.model('Video', videoSchema);