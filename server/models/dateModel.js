const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    scheduledAt: {
      type: Date,
      required: [true, 'A date must have a time'],
      default: Date.now(),
    },
    dateType: {
      type: String,
      enum: {
        values: ['coffee', 'rainy', 'winter', 'summer'],
        message: 'Invalid date type',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'accepted', 'expired'],
        message: 'Invalid input for status',
      },
      default: 'pending',
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DateChat',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Date', dateSchema);
