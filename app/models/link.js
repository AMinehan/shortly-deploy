var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var linkSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});
console.log('explosion!');
var Link = mongoose.model('Link', linkSchema);
 
linkSchema.pre('save', function(callback) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  callback();
});

module.exports = Link;
