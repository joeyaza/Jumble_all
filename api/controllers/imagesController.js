var Image = require('../models/image');
var request = require('request-promise');
var Promise = require('bluebird');
var RateLimiter = require('limiter').RateLimiter;
var limiter = new RateLimiter(1,250);

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

/*

var request = require('request-promise');
var Promise = require('bluebird');

request({ url: "", json: true })
  .then(function(err, res, body) {
    promises = body.response.results.map(function() {
      request({ url: "", headers: "", json: true })
    });

    return Promise.all(promises);
  })
  .then(fuction(gettyImageArray) {
    promises = gettyImagesArray.map(function(images) {
      var newImage = new Image();

      return newImage.save();
    });

    return Promises.all(promises);
  })
  .then(function(savedImages) {
    // all saved
    res.send(200).json({ images: savedImages });
  })
  .catch(function(err) {
    res.send(500);
  })
*/
function getGettyImages(categories) {
  var gettyImagesArray = [];
  var i = 0;

  return new Promise(function(resolve, reject) {

    function makeRequest() {

      var title = categories[i].webTitle.replace('&', 'and');

      var options = {
        url: "https://api.gettyimages.com:443/v3/search/images?embed_content_only=true&fields=date_created%2Cthumb%2Ctitle&page_size=5&phrase="+title+"&sort_order=newest",
        headers: {'Api-Key': process.env.GETTY_IMAGES_API_KEY},
        json: true
      };

      return request(options, function(err, res, body) {

        if(err) reject(err);

        gettyImagesArray = gettyImagesArray.concat(body.images.map(function(image) {
          image.category = categories[i].webTitle
          image.url = image.display_sizes[0].uri;
          delete image.display_sizes;

          return image;
        }));

        i++;

        if(i < categories.length) {
          console.log("working...", i);
          return makeRequest();
        }
        
        return resolve(gettyImagesArray);

      });
    };

    makeRequest();

  });
}

function addImages(req, res) {
  console.log("addImages");

  return request({ url: "http://content.guardianapis.com/sections?api-key="+process.env.GUARDIAN_API_KEY, json: true })
    .then(function(body) {
      return getGettyImages(body.response.results);
    })
    .then(function(images) {
      return Promise.all(images.map(function(image) {
        var newImage = new Image();
        newImage.title = image.title;
        newImage.image_url = image.url;
        newImage.category = image.category;
        newImage.created_at = image.date_created;
        return newImage.save();
      }));
    })
    .then(function(savedImages) {
      res.status(200).json({ message: "Images saved" });
    })
    .catch(function(err) {
      res.status(500).json({ message: err });
    });
}

module.exports = {
  imagesIndex: imagesIndex,
  addImages: addImages
}