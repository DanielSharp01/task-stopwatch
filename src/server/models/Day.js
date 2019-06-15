import mongoose, { Schema } from "mongoose";
import appConnection from "../db";

const DaySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  dateString: { type: String, required: true },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task"
    }
  ]
});

DaySchema.statics.findOrCreate = async function({ userId, dateString }) {
  let res = await this.findOne({ userId, dateString });
  if (res) return res;
  res = new this();

  res._id = mongoose.Types.ObjectId();
  res.userId = userId;
  res.dateString = dateString;
  return res;
};

DaySchema.index({ userId: 1, dateString: 1 }, { unique: true });

export default appConnection.model("Day", DaySchema);
