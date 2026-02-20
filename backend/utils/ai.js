import "dotenv/config";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-flash",
  temperature: 0
});

const getresponsefromai = async (messagearr) => {
  const cleanMessages = messagearr.map(({ role, content }) => ({ role, content }));
  let a = await llm.invoke(cleanMessages);
  return a.content;
};

export { getresponsefromai };
//      let b = [
//   { role: "user", content: "Hi! I'm Bob" },
//   { role: "assistant", content: "Hello Bob how was your day today" },
// ];

// let an=[...b,{ role: "user", content: `${req.body.quet}` }];


//     let a = await llm.invoke([
//   { role: "user", content: "Hi! I'm Bob" },
//   { role: "assistant", content: "Hello Bob how was your day today" },
//   { role: "user", content: `${req.body.quet}` },
// ]);