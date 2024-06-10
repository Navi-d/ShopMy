const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },

});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
