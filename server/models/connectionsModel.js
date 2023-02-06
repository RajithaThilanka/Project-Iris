const mongoose = require('mongoose');
const User = require('../models/userModel');
const connectionsSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: {
        values: [
          'con-req-pending',
          'connected',
          'friend-req-pending',
          'friends',
        ],
        message: 'Invalid input for status',
      },
      default: 'con-req-pending',
    },
  },
  { timestamps: true }
);

const Connection = mongoose.model('Connection', connectionsSchema);
module.exports = Connection;
