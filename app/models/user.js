var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, index: { unique: true } },
  password: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

User.comparePassword = function(candidatePassword, savedPassword, cb) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

userSchema.pre('save', function(next) {
  // hash password
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

User.hashPassword = function(password) {
  return bcrypt.hashSync(password);
};



module.exports = User;
