const mongoose = require('mongoose');

var User = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = User;