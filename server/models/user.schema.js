import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from "../config/index.js";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      max: [20, "userName should be less than 20 characters"],
      min: [6, "userName should be at least 6 characters"],
      required: [true, "userName should be provided"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "user email is required!"],
    },
    password: {
      type: String,
      required: [true, "password is required!"],
      min: [8, "password must be at least 8 characters"],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Mongoose Hooks -
 * password encryption using Middleware (pre hooks)
 * do something before data is save to the db
 */
userSchema.pre("save", async function (next) {
  // only modified if the password change -
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Mongoose Method -
 * validate / compare the password passed from the user
 * @param { String } userSendPassword - except plain password from the user
 * @return { Boolean } true/false - compare the password and return true if match else return false
 */
userSchema.methods.isValidPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

/**
 * Mongoose Method -
 * to generate token using jsonwebtoken library
 * @return {String} - generated token from jsonwebtoken with a secret key and token expiry date
 */
userSchema.methods.getJwtToken = function () {
  return JWT.sign(
    {
      _id: this._id,
      email: this.email,
    },
    config.JWT_SECRET_KEY,
    {
      expiresIn: config.JWT_EXPIRY,
    }
  );
};

export default mongoose.model("user", userSchema);
