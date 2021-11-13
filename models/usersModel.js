const mongoose = require("mongoose");
const validator = require("validator").default;
const bcrypt = require("bcrypt");
const Token = require("../util/Token");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Email is not valid",
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator(value) {
        return validator.isStrongPassword(value);
      },
      message:
        "There must be at least 8 character, one lowercase letter, one uppercase letter, one number, one special character",
    },
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator(value) {
        return validator.isMobilePhone(value, ["vi-VN"]);
      },
      message: "Phone is invalid. Please enter phone in your country",
    },
  },
  address: {
    street: {
      type: String,
      required: [true, "Please enter your street address"],
    },
    city: { type: String, required: [true, "Please enter your city"] },
    zipCode: { type: String, required: [true, "Please enter your zipcode"] },
  },
  image: Object,
  token: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.token = Token.signToken(this._id);
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const token = Token.signToken(this._id);
  this.token = token;
  await this.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.__v;
  return userObject;
};

userSchema.statics.findByCredentials = async function (email, password, next) {
  const user = await usersModel.findOne({ email });
  if (!user) {
    throw new Error("Unable to login, Password or email wrong.");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login, Password or email wrong.");
  }
  return user;
};

const usersModel = mongoose.model("user", userSchema);
module.exports = usersModel;
