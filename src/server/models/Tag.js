import mongoose, { Schema } from "mongoose";
import appConnection from "../db";

const TagSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  color: String,
  disabled: Boolean
});

TagSchema.statics.findOrCreate = async function({ userId, name }) {
  let res = await this.findOne({ userId, name });
  if (res) return res;
  res = new this();

  res._id = mongoose.Types.ObjectId();
  res.userId = userId;
  res.name = name;
  return res;
};

TagSchema.index({ userId: 1, name: 1 }, { unique: true });

export default appConnection.model("Tag", TagSchema);
