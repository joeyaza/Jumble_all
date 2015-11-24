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
      JSON.parse(body).items.forEach(function(vid){
        var info = JSON.parse(body);
        console.log(info);
        Video.findOne({"videoId":vid.id.videoId}, function(err, oldVideo){
          console.log(oldVideo);
          if (err) return res.status(500).json({message: "Something went wrong"});

          if (oldVideo) return false;

          var newVideo = new Video();
          newVideo.title = vid.snippet.title;
          newVideo.video_id = vid.id.videoId;
          newVideo.category = "politics";
          newVideo.published_at = vid.snippet.publishedAt;

          newVideo.save(function(err, video){
            if (err) return res.status(500).json({message: "Something went wrong"});
          });
        });
      });
    };
  };
  request(options, callback);
}

module.exports = {
  videosIndex: videosIndex,
  addVideos: addVideos
}