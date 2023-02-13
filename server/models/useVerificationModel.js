const mongoose = require('mongoose');
const crypto = require('crypto');

const userVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  uniqueString: String,
  createdAt: Date,
  expiresAt: Date,
});

userVerificationSchema.methods.createConfirmationToken = function () {
  const confirmationToken = crypto.randomBytes(32).toString('hex');

  this.uniqueString = crypto
    .createHash('sha256')
    .update(confirmationToken)
    .digest('hex');
  this.createdAt = Date.now();
  this.expiresAt = Date.now() + 2 * 24 * 60 * 60 * 1000;

  return confirmationToken;
};

const UserVerification = mongoose.model(
  'UserVerification',
  userVerificationSchema
);

module.exports = UserVerification;
