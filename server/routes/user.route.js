import express from "express";
const router = express.Router();

import {
  getUserInfo,
  home,
  login,
  logout,
  signup,
} from "../controllers/user.controller.js";
// middleware
import { isLogin } from "../middlewares/authUser.middleware.js";

// testing routes
router.route("/").get(isLogin, home);

// user signup route
router.route("/auth/user/signup").post(signup);
router.route("/auth/user/login").post(login);
router.route("/auth/user/logout").get(logout);
router.route("/auth/user/info").get(isLogin, getUserInfo);

// error route
// router.route("*").get(routeError);
export default router;
