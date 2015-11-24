var Image = require('../models/image');
var request = require('request');

// (function poll(){
//    setTimeout(function() {
//     addImage();
//   }, 30000);
// })();

function imagesIndex(req, res) {
  Image.find(function(err, images) {
    if (err) return res.status(404).json({message: "Something went wrong"});

    return res.status(200).json({images: images});
  });
}

function addImages(req, res) {
  var options = {
    url: 'https://api.gettyimages.com:443/v3/search/images?embed_content_only=true&fields=date_created%2Cthumb%2Ctitle&page_size=20&phrase=soccer&sort_order=best_match',
    headers: {
      'Api-Key': process.env.GETTY_IMAGES_API_KEY
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      info.images.forEach(function(pic) {
        Image.findOne({"title":})
      })
    }
  }
  request(options, callback);
}

module.exports = {
  imagesIndex: imagesIndex,
  addImages: addImages
}