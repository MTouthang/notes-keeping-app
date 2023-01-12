import express from "express";
import { createNote, getAllNotes } from "../controllers/note.controller.js";
import { routeError } from "../controllers/user.controller.js";
import { isLogin } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.route("/user/note").post(isLogin, createNote);
router.route("/user/notes").get(isLogin, getAllNotes);

// router.route("*").get(routeError);

export default router;
