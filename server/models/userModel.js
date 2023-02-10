const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Pleasse tell us your first name!'],
    },
    lastname: {
      type: String,
      required: [true, 'Pleasse tell us your last name!'],
    },
    callTag: {
      type: String,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: 'Please tell us your gender',
      },
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
      required: [true, 'Please provide your occupation'],
    },
    height: {
      type: [Number],
      required: [true, 'Please provide your height'],
    },
    maritalStatus: {
      type: String,
      enum: {
        values: [
          'single',
          'married',
          'widowed',
          'separated',
          'divorced',
          'complicated',
        ],
        message:
          'Marital status must be either single, in a relationship, married, widowed, separated, divorced, or complicated',
      },
      default: 'single',
    },
    educationLevel: {
      type: String,
    },
    monthlyIncome: {
      type: String,
      enum: {
        values: [
          'less than Rs.25,000',
          'between Rs.25,000 & Rs.50,000',
          'between Rs.50,000 & Rs.100,000',
          'between Rs.100,000 & Rs.150,000',
          'more than Rs.150,000',
        ],
        message: 'Please provide a valid monthly income',
      },
    },
    hasChildren: Boolean,
    religion: String,
    ethnicity: String,
    profilePhoto: String,
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
      enum: {
        values: ['user', 'admin'],
        message: 'Role must be either user or admin',
      },
      default: 'user',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    profileDescription: {
      type: String,
      minlength: 50,
    },
    userDescription: {
      type: String,
    },
    movies: {
      type: [String],
    },
    music: {
      type: [String],
    },
    politics: {
      type: [String],
    },
    socialMedia: {
      type: [String],
    },
    sports: {
      type: [String],
    },
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // answers: [Number],
    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
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
    manuallyVerified: {
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
  },
  {
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
