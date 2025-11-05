import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/checkuser", async (req, res) => {
  const { userid } = req.body;
  try {
    let user = await User.findOne({ userId: userid });
    if (!user) {
     return res.json({"isdoc":false,"message":"user does not exist"});
    }
    let b= user.verifyDoctor;
    console.log(b);
    res.json({ success: true, isdoc:b });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.post("/getuser", async (req, res) => {
  const { clerkId } = req.body;
  try {
    let user = await User.findOne({ userId: clerkId });
    if (!user) {
      user = new User({
        userId: clerkId,
        email,
        firstName,
        lastName,
        username
      });
      await user.save();
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.post("/adduser", async (req, res) => {
  const { clerkId, email, firstName, lastName ,username} = req.body;
  try {
    let user = await User.findOne({ userId: clerkId });
    if (!user) {
      user = new User({
        userId: clerkId,
        email,
        firstName,
        lastName,
        username
      });
      await user.save();
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;
