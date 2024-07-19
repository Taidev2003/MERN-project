const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const otpGenerator = require("otp-generator");
const { request } = require("express");
const nodemailer = require("nodemailer");
const { subscribe } = require("../routes/image");
const registerController = async (req, res) => {
  try {
    const exitregisterUser = await User.findOne({ email: req.body.email });
    if (exitregisterUser) {
      return res.status(200).send({
        message: "User already exits",
        success: false,
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;

    const confirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);
    const otp = otpGenerator.generate(6, {
      digits: true,
      upperCase: false,
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    req.body.confirmPassword = confirmPassword;
    if (req.body.password === req.body.confirmPassword) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        profileImage: req.body.profileImage,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        otp: otp,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "taithedev2003@gmail.com",
          pass: "uisr dpqc rlzh stzm",
        },
      });
      const mailOptions = {
        from: "auth client ",
        to: req.body.email,
        subscribe: "Otp for email vaerification ",
        text: `Your verify otp is ${otp}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Error sending email...");
        }
        res.send({
          message: "OTP sent to email",
        });
        return rs.status(201).send({
          message: "Register successfully",
          data: {
            user: newUser,
            token,
          },
          success: true,
        });
      });
    } else {
      return rs.status(201).send({
        message: "Password not match",

        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Register error",
      success: false,
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      console.log(user);
      return res.status(200).send({
        message: "register success",
        data: {
          user,
        },
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Auth error",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    const signuser = await User.findOne({ email: req.body.email });
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid password and email",
      });
    }
    const token = jwt.sign({ id: signuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).send({
      message: "Login successful",
      data: {
        user: signuser,
        token,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Auth error",
    });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the entire request body
    const email = req.body.email;
    const combineOtp = req.body.combineOtp;

    console.log("Email:", email); // Log the email
    console.log("Combined OTP:", combineOtp); // Log the combined OTP

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp === combineOtp) {
      user.isVerified = true;
      await user.save();
      res.status(200).send({
        success: true,
        message: "OTP verified",
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    console.error("Error in verifyOtpController:", error); // Log any errors
    res.status(500).send({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};

module.exports = {
  registerController,
  authController,
  loginController,
  verifyOtpController,
};
