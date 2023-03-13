const mongoose = require('mongoose');

const dateChatSchema = new mongoose.Schema(
  {
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DateMessage',
    },
  },
  { timestamps: true }
);

const DateChat = mongoose.model('DateChat', dateChatSchema);

module.exports = DateChat;
