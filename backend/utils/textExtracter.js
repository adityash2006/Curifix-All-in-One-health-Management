import { Document } from "../models/Document.js";
import PDF from "pdf-parse-debugging-disabled";
import fs from 'fs/promises'
export const ExtractTextAndGenerateSummary = async (file, id) => {
  try {
    if (!file) throw new Error("No file provided");

    console.log("file is", file);
    const data = await fs.readFile(file.path);
    const pdfData = await PDF(data);
    const extractedText = pdfData.text;
    if (!extractedText) {
        throw new Error("Error in extracting text from file");
    }
    
    if(extractedText){
        await Document.findByIdAndUpdate(id,{
            document_content: extractedText
        });
    }
    console.log("Text extraction completed ....")
    
    return extractedText;
  } catch (error) {
    console.log(error);
    return null;
  }
};