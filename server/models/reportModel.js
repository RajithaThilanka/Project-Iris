const mongoose = require('mongoose');

const reportSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    reportedUserId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    reason: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
