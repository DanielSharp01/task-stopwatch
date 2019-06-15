import mongoose, { Schema } from "mongoose";
import { getTimeParts } from "../../utils/timeFormat";
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

// Returns true if Task needs saving
TaskSchema.methods.rectifyStopDate = function() {
  if (this.checked) return false;

  let now = new Date();
  // If not yet stopped but should be because it's already tomorrow
  if (!this.stop && this.start.getDate() < now.getDate()) {
    this.stop = new Date(this.start);
    this.stop.setDate(this.stop.getDate() + 1);
    this.stop.setHours(0, 0, 0, 0);
  }
  // If stopped but the date is just wrong
  else if (this.stop && this.stop.getDate() > this.start.getDate()) {
    // Could be stopped on midnight that is expected
    const { hours, minutes, seconds, milliseconds } = getTimeParts(this.stop);
    if (hours !== 0 || minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
      this.stop.setHours(0, 0, 0, 0);
    }
  }
  // We don't want to check always so set a flag
  this.checked = true;
  return true;
};

export default appConnection.model("Task", TaskSchema);
