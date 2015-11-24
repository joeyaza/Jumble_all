var Video = require('../models/video');
var request = require('request');

// (function poll(){
//    setTimeout(function() {
//     addImage();
//   }, 30000);
// })();

function videosIndex(req, res) {
  Video.find(function(err, videos) {
    if (err) return res.status(404).json({message: "Something went wrong"});

    return res.status(200).json({videos: videos});
  });
}

function addVideos(req, res) {
  var options = {
    url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=politics&key=' + process.env.YOUTUBE_API_KEY
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      console.log(info);
    }
  }
  request(options, callback);
}

module.exports = {
  videosIndex: videosIndex,
  addVideos: addVideos
}