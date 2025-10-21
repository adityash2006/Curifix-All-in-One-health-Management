import express from "express";
import "dotenv/config"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import cors from "cors";
import { getresponsefromai } from "./utils/ai.js";
import mongoose from "mongoose";
import chatroutes from "./routes/chat.js";
import authroutes from "./routes/auth.js";
import healthroutes from "./routes/health.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api",chatroutes);
app.use("/api/auth", authroutes);
app.use("/api", healthroutes);

const Connectmongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("database connection error:", error);
  }
};

app.post("/chat",async(req,res)=>{
  console.log("req is hit");
  let b=await getresponsefromai(req.body.quet);
  console.log(b);
  res.send(b);

});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  Connectmongo();
});


