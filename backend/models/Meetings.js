
import mongoose from "mongoose";

const wardSchema = new mongoose.Schema({
  wardId: { type: String, required: true, unique: true },
  startedAt: { type: Date, default: Date.now },
});

export const Ward = mongoose.model("Ward", wardSchema);
