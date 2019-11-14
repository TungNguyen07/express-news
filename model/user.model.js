const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    email: String,
    name: String,
    permission: {type: Number, default: 0},
    },
    {versionKey:false})

let users = mongoose.model('users', userSchema);

module.exports = users;