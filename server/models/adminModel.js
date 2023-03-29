const mongoose = require('mongoose');
const validator = require('validator');
const bycrypt = require('bcryptjs');
const adminSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Pleasse tell us your first name!'],
    },
    lastname: {
      type: String,
      required: [true, 'Pleasse tell us your last name!'],
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    profilePhoto: {
      type: String,
      default: 'defaultProfile.png',
    },
  },
  { timestamps: true }
);

adminSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bycrypt.compare(candidatePassword, userPassword);
};

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
