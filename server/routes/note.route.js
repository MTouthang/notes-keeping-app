import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNote,
  noteColor,
  searchNote,
  updateNote,
} from "../controllers/note.controller.js";

//TODO: best way to handle non existing route

// import { routeError } from "../controllers/user.controller.js";
import { isLogin } from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.route("/user/note").post(isLogin, createNote);
router.route("/user/notes").get(isLogin, getAllNotes);
router.route("/user/note/:id").get(isLogin, getNote);
router.route("/user/note/:id").delete(isLogin, deleteNote);
router.route("/user/note/:id").put(isLogin, updateNote);
router.route("/user/note/ui/:id").put(isLogin, noteColor);
router.route("/user/note").get(isLogin, searchNote);

// router.route("*").get(routeError);

export default router;
