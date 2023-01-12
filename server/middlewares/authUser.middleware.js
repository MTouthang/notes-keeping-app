import CustomError from "../utils/customError.js";
import asyncHandler from "../services/asyncHandler.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import User from "../models/user.schema.js";

export const isLogin = asyncHandler(async (req, res, next) => {
  // 1. get token
  // 2. Throw error is token does not exist
  // 3. decode token

  // const token =
  //   req.cookies.token || req.header("Authorization").replace("Bearer ", "");

  let token;

  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    // 401 Unauthorized - The client is not authorized to access the requested resource
    throw new CustomError("Login first to access this page", 401);
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = await User.findById(decoded._id, "name, email");
    next();
  } catch (error) {
    // 401 Unauthorized - The client is not authorized to access the request resource
    throw new CustomError("Not authorized to access this route", 401);
  }
});
