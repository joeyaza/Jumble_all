var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/jumbulIt';
module.exports = {
  'secret': process.env.PROJECT_THREE_SECRET_KEY,
  'database': mongoUri
}