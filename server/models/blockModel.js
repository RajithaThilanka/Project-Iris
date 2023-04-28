const mongoose = require('mongoose');
const validator = require('validator');

const blockSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  blockedUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
});

const Block = mongoose.model('Block', blockSchema);
module.exports = Block;
