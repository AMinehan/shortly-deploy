// NOTE: this file is not needed when using MongoDB
var db = require('../config');
var User = require('../models/user');

var Users = db.Collection();

Users.model = User;

module.exports = Users;