// // models/UserChallenge.js
// const mongoose = require('mongoose');

// const UserChallengeSchema = new mongoose.Schema({
//   userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   challengeId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
//   startDate:     { type: Date, required: true },
//   completedDays: [{ type: Number }],
//   lastUpdated:   { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('UserChallenge', UserChallengeSchema);

// models/UserChallenge.js
const mongoose = require('mongoose');

const UserChallengeSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challengeId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  startDate:     { type: Date, required: true },
  completedDays: [{ type: Number }],
  lastUpdated:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserChallenge', UserChallengeSchema);