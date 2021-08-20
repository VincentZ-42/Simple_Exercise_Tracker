const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  }, 
}, {
  timestamps: true,     // This creates timestamps for creation, modification etc
});

const User = mongoose.model('User', userSchema);

module.exports = User;