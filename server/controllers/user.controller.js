import config from "../config/index.js";
import User from "../models/user.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";
import validator from "validator";
import mailHelper from "../services/mailHelper.js";
/********************************************
 * test home route
 *******************************************/
export const home = asyncHandler((req, res, next) => {
  res.send("Home Route - You have successfully created your account");
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

  // validating email with validator
  if (!validator.isEmail(email)) {
    throw new CustomError("Please enter a valid email", 400);
  }

  if (!userName || !email || !password) {
    // 400 Bad request - The request was malformed or invalid
    throw new CustomError("Please fill all fields", 400);
  }

  if (password.length <= 7) {
    throw new CustomError("Password must 8 characters or more!");
  }

  // check if user already exist with user email
  const userExist = await User.findOne({ email });

  if (userExist) {
    // Error 400 bad request - The request was malformed or invalid
    throw new CustomError(
      "User email already exists, try with other email",
      400
    );
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
  // select("+password") to include the password field with the particular email found
  const user = await User.findOne({ email }).select("+password");

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

/******************************************
 * @getUserInform
 * @route http://localhost:8080/api/v1/auth/user/info
 * @description get user information by passing user id
 * @parameters
 * @return { object } objects of userInformation
 ******************************************/
export const getUserInfo = asyncHandler(async (req, res, next) => {
  const data = await User.findById(req.user._id).select("-password");

  if (!data) {
    throw new CustomError("User information not able to fetch", 400);
  }

  res.status(200).json({
    success: true,
    data,
  });
});

/******************************************
 * @userForgotPassword
 * @route http://localhost:8080/api/v1/auth/password/forgot
 * @description user will submit email and will generate token
 * @parameters {String} email
 * @return {String} success message
 ******************************************/
export const userForgotPassword = asyncHandler(async (req, res, next) => {
  // get email
  const { email } = req.body;

  // check user in the database
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("user is not available", 404);
  }

  // get resetToken
  const resetToken = user.getForgotPasswordToken();

  if (!resetToken) {
    throw new CustomError("Problem in generating the token", 500);
  }

  // save the resetToken to db
  await user.save({ validateBeforeSave: false });

  // create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/password/reset/${resetToken}`;

  // create mail text with url
  const text = `Your password reset url is \n\n
  ${resetUrl} \n\n`;

  try {
    await mailHelper({
      email: user.email,
      subject: "Reset Password Link",
      text: text,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email}`,
    });
  } catch (err) {
    // removing the generated value
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiryDate = undefined;
    user.save({ validateBeforeSave: false });

    // show the error
    throw new CustomError(err.message || "Email fail to sent", 500);
  }
});
