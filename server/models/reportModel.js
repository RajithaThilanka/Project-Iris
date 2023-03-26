const mongoose = require('mongoose');

const reportSchema = mongoose.Schema(
  {
    reportedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reportedByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reason: {
      type: String,
      required: true,
    },
    evidence: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    reviewStatus: {
      type: String,
      enum: {
        values: ['pending', 'positive', 'negative'],
      },
      default: 'pending',
    },
    adminId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    userNotified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
