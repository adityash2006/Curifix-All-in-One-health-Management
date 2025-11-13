import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  document_content:{
    type:String
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export const Document = mongoose.model("Document", documentSchema);
