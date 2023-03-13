const mongoose = require('mongoose');

const dateMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DateChat',
    },
  },
  { timestamps: true }
);

const DateMessage = mongoose.model('DateMessage', dateMessageSchema);

module.exports = DateMessage;
