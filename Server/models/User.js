const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: '' },
  age: { type: Number, default: null },
  bio: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  height: { type: Number, default: null },
  weight: { type: Number, default: null },
  goal: { type: String, default: '' },
  activityLevel: { type: String, default: '' },
  isAdmin: { type: Boolean, default: false }, // for Admin Dashboard
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
