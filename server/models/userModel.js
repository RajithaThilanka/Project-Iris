const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    callTag: {
      type: String,
    },
    gender: {
      type: String,
    },
    languages: {
      type: [String],
    },

    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    dob: {
      type: Date,
    },
    occupation: {
      type: String,
    },
    country: {
      type: String,
    },
    height: {
      type: Number,
    },

    educationLevel: {
      type: String,
    },
    monthlyIncome: {
      type: String,
    },
    hasChildren: {
      type: Boolean,
    },
    religion: {
      type: String,
    },
    ethnicity: {
      type: String,
    },
    profilePhoto: {
      type: String,
      default: 'defaultProfile.png',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    role: {
      type: String,

      default: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    // Refers to the tags that will be sent to AI
    // profileDescription: {
    //   type: String,
    // },
    userDescription: {
      type: String,
    },
    photos: {
      type: [String],
      default: [],
    },
    urls: {
      type: [String],
      default: [],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
    },
    isClustered: {
      type: Boolean,
      default: false,
    },
    lastCompletedStep: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// userSchema.virtual('sentDates', {
//   ref: 'DateBooking',
//   foreignField: 'inviter',
//   localField: '_id',
// });

// userSchema.virtual('receivedDates', {
//   ref: 'DateBooking',
//   foreignField: 'invitee',
//   localField: '_id',
// });

userSchema.virtual('age').get(function () {
  let date = new Date(this.dob);
  let today = new Date();
  let timeDiff = today.getTime() - date.getTime();
  let age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
  return age;
});
//Document Middleware

userSchema.pre('save', async function (next) {
  this.callTag = this.firstname + ' ' + this.lastname[0] + '.';
  next();
});

//Encrypting the password before saving the document
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bycrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

//Setting up password changed time
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//INSTANCE METHODS
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bycrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
