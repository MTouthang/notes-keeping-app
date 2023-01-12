import Note from "../models/note.schema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../utils/customError.js";

/******************************************
 * @createNote
 * @route http://localhost:8080/api/v1/user/note
 * @description  note Controller for creating new note
 * @parameters { String, ObjectId } title, content and user._id (will be pass from the isLogin middleware)
 * @return { Object } note object
 ******************************************/
export const createNote = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    // 400 bad request - the request was malformed or invalid
    throw new CustomError("Please fill the title and content field", 400);
  }

  req.body.author = req.user._id;

  const note = await Note.create(req.body);

  res.status(200).json({
    success: true,
    note,
  });
});

/******************************************
 * @getAllNotes
 * @route http://localhost:8080/api/v1/user/notes
 * @description  get all notes created by the user
 * @parameters
 * @return { Object } objects of notes
 ******************************************/
export const getAllNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find({ author: req.user._id });

  console.log("Notes-", notes);

  if (!notes) {
    // 500 - Internal Server Error - An error occurred on the server
    throw new CustomError("notes unable to fetch", 500);
  }

  res.status(200).json({
    success: true,
    notes,
  });
});
