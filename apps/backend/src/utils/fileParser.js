import fs from "fs";
import pdf from 'pdf-parse/lib/pdf-parse.js'



export async function extractTextFromFile(filePath) {
  const buffer = fs.readFileSync(filePath);

  if (filePath.endsWith(".pdf")) {
    const data = await pdf(buffer);
    return data.text;
  } else if (filePath.endsWith(".txt")) {
    return buffer.toString();
  } else {
    throw new Error("Unsupported file format. Only PDF and TXT are allowed.");
  }
}
