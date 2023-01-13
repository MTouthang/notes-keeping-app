import mongoose from "mongoose";
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

  // TODO: should return empty array or throw error and pass error message
  if (!notes) {
    // 500 - Internal Server Error - An error occurred on the server
    throw new CustomError("notes unable to fetch", 500);
  }

  res.status(200).json({
    success: true,
    notes,
  });
});

/******************************************
 * @getNote
 * @route http://localhost:8080/api/v1/user/note/id
 * @description  get single note by id
 * @parameters note id
 * @return { Object } single note object
 ******************************************/
export const getNote = asyncHandler(async (req, res, next) => {
  // check first if note is present

  // using mongodb aggregate to return all the notes that match the pass note id and user id
  const note = await Note.aggregate([
    {
      $match: {
        $and: [
          { _id: new mongoose.Types.ObjectId(req.params.id) },
          { author: new mongoose.Types.ObjectId(req.user._id) },
        ],
      },
    },
  ]);

  if (note.length <= 0) {
    // 201 No Content - The request was successful, but there is no content to return
    throw new CustomError("Note not available", 201);
  }
  res.status(200).json({
    success: true,
    note,
  });
});

/******************************************
 * @deleteNote
 * @route http://localhost:8080/api/v1/user/note/id
 * @description  get note by id and delete it
 * @parameters note id
 * @return { object } success true/false and message
 ******************************************/
export const deleteNote = asyncHandler(async (req, res, next) => {
  // get all notes from user
  const user = await Note.find({ author: req.user._id });

  // making sure note comes from user and note is present
  if (user.length <= 0) {
    throw new CustomError("No Notes available", 201);
  }

  const deleted = await Note.findByIdAndDelete(req.params.id);

  if (!deleted) {
    // 400 Bad Request - The request was malformed or invalid
    throw new CustomError("Note already deleted or not available", 400);
  }

  res.status(200).json({
    success: true,
    message: "notes deleted successfully",
  });
});

/******************************************
 * @updateNote
 * @route http://localhost:8080/api/v1/user/note/id
 * @description  get note by id and update it
 * @parameters note_id, title and content
 * @return { object } success true/false and message
 ******************************************/
export const updateNote = asyncHandler(async (req, res, next) => {
  // check the parameter are present

  //TODO: why OR why not &&
  if (!req.body.title || !req.body.content) {
  }

  // check first if the user have notes
  const user = await Note.find({ author: req.user._id });
  if (user.length <= 0) {
    // 204 No content - The request was successful, but there is no content to return
    throw new CustomError("No Notes available", 204);
  }

  const updateNote = await Note.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, content: req.body.content },
    { new: true }
  );

  console.log("update Note - ", updateNote);

  if (!updateNote) {
    // 400 bad request - The request was malformed or invalid
    throw new CustomError("note unable to update", 400);
  }

  res.status(200).json({
    success: true,
    message: "note updated successfully",
  });
});

/******************************************
 * @searchNote
 * @route http://localhost:8080/api/v1/user/note?title=value
 * @description  search for a particular note with text/keyword
 * @parameters { String } searchNote keyword/string
 * @return { object } notes object that match the search keyword/text
 ******************************************/
export const searchNote = asyncHandler(async (req, res, next) => {
  const { title } = req.query;

  if (!title) {
    // 400 bad request - The request is malformed or invalid
    throw new CustomError("search title field is required!", 400);
  }

  const note = await Note.find({
    author: req.user._id,
    title: { $regex: title, $options: "i" },
  });

  if (!note) {
    // 400 bad request - The request is malformed or invalid
    throw new CustomError("Search Unable to perform!", 400);
  }

  res.status(200).json({
    success: true,
    note,
  });
});
