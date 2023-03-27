const mongoose = require('mongoose');

const manualVerificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    liveImage: {
      type: String,
      required: true,
    },
    nicFront: {
      type: String,
      required: true,
    },
    nicBack: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'verified', 'failed'],
      },
      default: 'pending',
    },
  },
  { timestamps: true }
);

const ManualVerification = mongoose.model(
  'ManualVerification',
  manualVerificationSchema
);
module.exports = ManualVerification;
