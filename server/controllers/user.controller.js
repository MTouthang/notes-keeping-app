import { token } from "morgan";
import config from "../config/index.js";
import User from "../models/user.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";

/********************************************
 * test home route
 *******************************************/
export const home = asyncHandler((req, res, next) => {
  res.send("hello home");
});

/********************************************
 * route error handling
 *******************************************/
export const routeError = asyncHandler((req, res, next) => {
  res.send("Undefined API Route");
});

/******************************************
 * @signup
 * @route http://localhost:8080/api/v1/auth/user/signup
 * @description User signUp Controller for creating new user
 * @parameters {String } name, email, password
 * @return {Object} user object
 ******************************************/
export const signup = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    // 400 Bad request - The request was malformed or invalid
    throw new CustomError("Please fill all fields", 400);
  }

  // check if user already exist with user email
  const userExist = await User.findOne({ email });
  if (userExist) {
    // Error 400 bad request - The request was malformed or invalid
    throw new CustomError("User already exists", 400);
  }

  // if user did not exist
  const user = await User.create({
    userName,
    email,
    password,
  });

  // generate token from getJwtToken function define in the user model
  const token = user.getJwtToken();
  user.password = undefined;
  console.log(user);

  // setup the cookie with token as name value pass as token and cookieOption of expires time and httpOnly mode
  res.cookie("token", token, config.cookieOption);

  // success response status
  // 200 OK - The request was successful
  res.status(200).json({
    success: true,
    token,
    user,
  });
});

/******************************************
 * @login
 * @route http://localhost:8080/api/v1/auth/user/login
 * @description User login Controller for login of the user
 * @parameters { String } email, password
 * @return { Object } user object
 ******************************************/
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. check for email and password
  if (!email || !password) {
    // 400 bad request - The request was malformed or invalid
    throw new CustomError("Both Email and Password field are required!", 400);
  }

  // 2. check for the email if exist or not exist
  const user = await User.findOne({ email });
  if (!user) {
    // 400 bad request - The request was malformed or invalid
    throw new CustomError("User not found!", 400);
  }

  // 3. if email/user exist compare password

  const isPassWordMatch = await user.isValidPassword(password);
  if (isPassWordMatch) {
    const token = user.getJwtToken();
    user.password = undefined;
    res.cookie("token", token, config.cookieOption);

    // 4. return user info and token
    return res.status(200).json({
      success: true,
      token,
      user,
    });
  }

  // 400 bad request - The request was malformed or invalid
  throw new CustomError("Invalid Password Entered!", 400);
});

/******************************************
 * @logout
 * @route http://localhost:8080/api/v1/auth/user/logout
 * @description User logout Controller by clearing the cookies
 * @parameters
 * @return success message
 ******************************************/
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out successfully",
  });
});
