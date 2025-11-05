import mongoose from "mongoose";
const MessageSchema=new mongoose.Schema({
    role:{
        type:String,
        enum:["user","assistant","system"],
        required:true
    },
    content:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});

export const ThreadSchema=new mongoose.Schema({
    threadId:{
        type:String,
        required:true,
        unique:true
    },
     userId: { type: String, required: true },
    title:{
        type:String,
        default:"New Thread"
    },
    messages:[MessageSchema],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }

});

export default mongoose.model("Thread", ThreadSchema);

