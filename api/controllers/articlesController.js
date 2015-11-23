var Article = require('../models/article');
var request = require('request');

// (function poll(){
//    setTimeout(function() {
//     addArticle();
    
//   }, 30000);
// })();

function addArticle(req, res) {
  request("http://content.guardianapis.com/search?order-by=newest&page-size=200&api-key="+process.env.GUARDIAN_API_KEY, function(error, response, body) {
    if (!error && response.statusCode===200) {
      JSON.parse(body).response.results.forEach(function(article) {
        Article.findOne({"title":article.webTitle}, function(err, oldArticle) {
          if (err) return res.status(500).json({message: "Something went wrong!"});

          if (oldArticle) return false;

          var newArticle = new Article();
          newArticle.title = article.webTitle;
          newArticle.article_url = article.webUrl;
          newArticle.publication_date = article.webPublicationDate;
          newArticle.category = article.sectionName;

          newArticle.save(function(err, article) {
            if (err) return res.status(500).json({message: "Something went wrong!"});
          })
        })
      });
    }
  })
}

module.exports = {
  addArticle: addArticle
}