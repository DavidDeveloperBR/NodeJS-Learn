const mongoose = require('mongoose');

var User = new mongoose.Schema({
    name: String,
    email: String,
    paswword: String
});

module.exports = User;