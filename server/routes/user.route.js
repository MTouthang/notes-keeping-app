import express from "express";

import {
  getUserInfo,
  home,
  login,
  logout,
  signup,
  userForgotPassword,
} from "../controllers/user.controller.js";
// middleware
import { isLogin } from "../middlewares/authUser.middleware.js";
const router = express.Router();

// testing routes
router.route("/").get(isLogin, home);

// user signup route
router.route("/auth/user/signup").post(signup);
router.route("/auth/user/login").post(login);
router.route("/auth/user/logout").get(logout);
router.route("/auth/user/info").get(isLogin, getUserInfo);
router.route("/auth/password/forgot").post(userForgotPassword);

// error route
// router.route("*").get(routeError);
export default router;
