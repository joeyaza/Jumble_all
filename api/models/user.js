var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  }
});

userSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);