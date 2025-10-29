import express from "express";
import Thread from "../models/Thread.js";
import auth from "../middleware/auth.js";
const router=express.Router();
import { getresponsefromai } from "../utils/ai.js";

router.post("/testing",async(req,res)=>{
    try {
        const a =new Thread({
            threadId:"another",
            title:"the second chat"
        });
        let b=await a.save();
        res.send(b);
    }catch(err){
        console.log("some error in adding the data",err);
    }
});

router.get("/thread",async (req,res)=>{
    try {
        let th=await Thread.find({}).sort({updatedAt:-1});
        //updated at -1 means descending order
        res.json(th);
        
    } catch (error) {
        console.log("failed to fetch threads",error);
        res.status(500).json({error:"failed to fetch the data or thread"})
    }
});

router.get("/thread/:threadId",async(req,res)=>{
    const {threadId}=req.params;
    try {
        const thread=await Thread.findOne({threadId});
        if(!thread){
            res.status(404).json({error:"this is not a valid thread id in the database"});
        }
        res.json(thread.messages);
        
    } catch (error) {
        console.log("error while finding the thread",error);
        res.status(404).json({error:"thread not found"});
    }
});

router.delete("/thread/:threadId",async (req,res)=>{
    const {threadId}=req.params;
    try {
        const dele=await Thread.findOneAndDelete({threadId});
        if(!dele){
            res.json({error:"unable to delete this route maybe because this id does not exist"});
        }
        res.status(200).json({success:"thread deleted successfully"});
    } catch (error) {
        console.log("error in deleting the route",error);
    }
});

router.post("/chat", async (req,res)=>{
    const {threadId,message}=req.body;
    if(!threadId || !message){
        res.status(400).json({error:"required fields not found"});
    }
    try {
        let thread=await Thread.findOne({threadId});
        if(!thread){
            //create a new thread
            thread=new Thread({
                threadId,
                title:message,
                messages:[
                    {
                        role:"system",content:'You are Curifix, an AI health assistant. Your role is to provide general health information, symptom guidance, and self-care tips based on user input. Rules you must always follow: 1. Only answer health-related questions (symptoms, conditions, treatments, prevention, lifestyle, wellness). 2. If a question is unrelated to health, politely refuse and say: "I can only help with health-related questions. Please ask me something about your symptoms or medical concerns." 3. Never provide content outside health and wellness (e.g., jokes, tech, politics, finance)."** 4. Be concise, supportive, and clear. Use simple, easy-to-understand language. Your goal: help users better understand their symptoms, possible causes, and safe next steps, while reminding them to seek real medical care when needed...'},
                    {role:"user",content:message}]
            })
        }else{
            thread.messages.push({role:"user",content:message})
        }
        const assistantreply= await getresponsefromai(thread.messages);
        console.log("assistant reply is",assistantreply);
        thread.messages.push({role:"assistant",content:assistantreply});
        thread.updatedAt=new Date();
        await thread.save();
        res.status(200).json({reply:assistantreply})
    } catch (error) {
        console.log("some error in the api/chat route",error);
    }
})

export default router;