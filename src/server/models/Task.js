import mongoose, { Schema } from "mongoose";
import appConnection from "../db";

const TaskSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  start: { type: Date, required: true },
  stop: { type: Date },
  checked: Boolean,
  disabled: Boolean,
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ]
});

TaskSchema.statics.create = function({ userId, name }) {
  let res = new this();
  res._id = mongoose.Types.ObjectId();
  res.userId = userId;
  res.name = name;
  return res;
};

export default appConnection.model("Task", TaskSchema);
