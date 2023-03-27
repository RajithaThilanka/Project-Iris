const mongoose = require('mongoose');
const validator = require('validator');
const settingSchema = new mongoose.Schema(
  {
    hateSpeechScheduledAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model('Settings', settingSchema);
module.exports = Settings;
