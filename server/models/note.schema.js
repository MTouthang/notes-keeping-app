import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "note title is required"],
      max: [50, "note title must be less than 50 characters"],
    },
    content: {
      type: String,
      required: [true, "note content is required!"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("note", noteSchema);
