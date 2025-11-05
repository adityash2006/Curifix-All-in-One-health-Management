import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  role: { type: String, enum: ["doctor", "patient"], default: "patient" },
  verifyDoctor:{ type: Boolean , default:false } ,
  createdAt: { type: Date, default: Date.now },
});



export default mongoose.model('User', userSchema);
