const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    email: String,
    name: String,
    permission: {type: Number, default: 0},
    })

userSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        user.updated_at = Date.now();
        return next();
      });
    });
  } else {
    if (user.username) {
      user.username = user.username.toLowerCase();
    }
    return next();
  }
});

userSchema.methods.comparePassword = function(password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (err) {
    return err;
  }
};

let users = mongoose.model('users', userSchema);

module.exports = users;