const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goalSteps: { type: Number, required: true },
  durationDays: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isPrivate: { type: Boolean, default: false },

  // User references
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Challenge', challengeSchema);
