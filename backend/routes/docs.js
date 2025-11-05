import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Document } from "../models/Document.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const docs = await Document.find({ userId }).sort({ uploadedAt: -1 });
    if(!docs){
      return res.status(404).json({message:"No documents found"});
    }
    console.log("Fetch docs",docs);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// 📤 Upload Route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      type: "authenticated"
    });

    const doc = await Document.create({
      userId,
      name: req.file.originalname,
      publicId: result.public_id
    });

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// 📄 Get all user's documents



// 👁️ Generate temporary signed URL (5 min)
router.post("/view/:id", async (req, res) => {
  try {
    const { userId } = req.body;
    const doc = await Document.findById(req.params.id);
   
console.log("View doc",doc);
    if (!doc || doc.userId !== userId)
      return res.status(403).json({ message: "Access denied" });

    const url = cloudinary.url(doc.publicId, {
      type: "authenticated",
      resource_type: "image",
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 300 // 5 mins
    });

    res.json({ url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🗑️ Delete Document
router.delete("/:id", async (req, res) => {
  try {
    const { userId } = req.body;
    const doc = await Document.findById(req.params.id);
    console.log("Delete doc",doc);

    if (!doc || doc.userId !== userId)
      return res.status(403).json({ message: "Access denied" });

    await cloudinary.uploader.destroy(doc.publicId, { resource_type: "image", type: "authenticated" });
    await doc.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
