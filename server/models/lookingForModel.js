const mongoose = require('mongoose');

const LookingForSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  relationshipGoal: {
    type: String,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
    },
  },
  ageRange: {
    minAge: Number,
    maxAge: Number,
  },
  height: {
    minHeight: Number,
    maxHeight: Number,
  },
});

const LookingFor = mongoose.model('LookingFor', LookingForSchema);
module.exports = LookingFor;
