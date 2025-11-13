import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Document } from "../models/Document.js";
import { ExtractTextAndGenerateSummary } from "../utils/textExtracter.js";
import generateMedicalSummary from "../utils/medicalsummary.js";

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
// Upload Route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      type: "private"
    });

    const doc = await Document.create({
      userId,
      name: req.file.originalname,
      publicId: result.public_id,
    });

    ExtractTextAndGenerateSummary(req.file,doc._id );
    
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/summarize/:id", async (req, res) => {
  try {
    console.log("Summarize route called");
    
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      console.log("Document not found");
      return res.status(404).json({ message: "Document not found" });
    }
    const a=await generateMedicalSummary(doc.document_content);
    res.status(200).json({ summary: a } );
  }
     catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/view/:id", async (req, res) => {
  try {
    const { userId } = req.body;
    const doc = await Document.findById(req.params.id);
   
console.log("View doc",doc);
    if (!doc || doc.userId !== userId)
      return res.status(403).json({ message: "Access denied" });
const expiry = Math.floor(Date.now() / 1000) + 100; //100 seconds from now
console.log("expires_at: some time", expiry);
const format = doc.name.split('.').pop();
    const url = cloudinary.utils.private_download_url(doc.publicId,format ,{
      type: "private",
      resource_type: "image",
      sign_url: true,
      expires_at: expiry ,
      version: Date.now() 
    });
    

    res.json({ url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//  Delete 
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
