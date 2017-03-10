var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var linkSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  link: String,
  visits: Number
});

var Link = mongoose.model('Link', linkSchema);

Link.createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

module.exports = Link;
