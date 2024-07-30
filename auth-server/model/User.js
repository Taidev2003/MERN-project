const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      require: true,
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      require: true,
      minlength: 8,
      select: false,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password are not match",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
      select: true,
    },
    otp: {
      type: Number,
    },
    street: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    zipcode: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profileImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
