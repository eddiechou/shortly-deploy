var path = require('path');
var mongoose = require('mongoose');
var userSchema = require('./models/user');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;


var linkSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamps: { type: Date, default: Date.now }
});

db.once('open', function() {
  console.log('connected');
  userSchema.methods.insert('Eddie', 'hello');
  // var User = mongoose.model('User', userSchema);
  // var Link = mongoose.model('Link', linkSchema);
  // var eddie = new User({ username: 'Eddie' });
  // console.log(eddie.username);

  // eddie.save(function (err, eddie) {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   console.log('inside save', eddie);
  // });


  // User.find(function (err, users) {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   console.log(users);
  // });

  // userSchema.methods.addUser = function() {


});
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

var db = {
  userSchema: userSchema,
  linkSchema: linkSchema
};
module.exports = db;