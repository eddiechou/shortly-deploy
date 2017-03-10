var path = require('path');
var mongoose = require('mongoose');
var userSchema = require('./models/user');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('connected');
});

module.exports = db;