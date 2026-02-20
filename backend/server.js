
import express, { urlencoded } from "express";
import "dotenv/config"
import cors from "cors";
import http from "http";
import { getresponsefromai } from "./utils/ai.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import chatroutes from "./routes/chat.js";
// import authroutes from "./routes/auth.js";
import saveUser from "./routes/saveUserClerk.js"
// import clerkWebhook from "./routes/clerk.js";
import { connectToSocket } from "./utils/socketManager.js";
import wardRoutes from "./routes/wardRoutes.js"
import fileUploadRouter from "./routes/docs.js";

const app = express();
app.use(cors({
  origin: "*", // change this to your frontend origin in production
  methods: ["GET", "POST","DELETE"],
  credentials: true,
}));
app.use(express.json(urlencoded({ extended: true })));
app.use("/api",chatroutes);
app.use("/api/users", saveUser);
app.use("/api/wards", wardRoutes);
app.use("/api/docs", fileUploadRouter);


const server = http.createServer(app);
const io = connectToSocket(server);
io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);
});

import dns from "dns";
dns.setServers(['8.8.8.8']);
const Connectmongo = async () => {
  try {
    console.log("trying to connect mongo");

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

app.get("/",(req,res)=>{
  res.json({
    message:"server is working "
  })
})

server.listen(3000, () => {
  console.log("Server is running on port 3000");
  Connectmongo();
});


