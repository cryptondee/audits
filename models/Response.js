import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  url: { type: String, required: true },
  tokenA: { type: String, required: true },
  tokenB: { type: String, required: true },
  report: { type: Object, required: true },
});

export default mongoose.models.Response ||
  mongoose.model("Response", responseSchema);
