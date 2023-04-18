const mongoose = require('mongoose');
const validator = require('validator');
const userSettingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    searchTokens: {
      count: {
        type: Number,
      },
      expiresIn: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

const UserSettings = mongoose.model('UserSettings', userSettingSchema);
module.exports = UserSettings;
