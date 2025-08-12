import { ChatOllama } from "@langchain/ollama";

import { extractTextFromFile } from "../utils/fileParser.js"; // create this util
import fs from "fs";

const initModel = (model, temperature = 0.7) => {
  return new ChatOllama({ model, temperature });
};

// --- Article Generation ---
export async function generateArticle({ topic, tone = "neutral", length = "medium", audience = "general", style = "informative" }) {
  const model = initModel("llama3.2");

  const prompt = `Write a ${length} article for a ${audience} audience about "${topic}" in a "${tone}" tone and "${style}" style.`;
  const response = await model.invoke(["human", prompt]);
  return response.content;
}

export async function reviewResumeFile(filePath, res,role) {
  try {
    console.log("path", filePath)
    const resumeText = await extractTextFromFile(filePath);
    const model = initModel("promptify-resume");
    console.log("data", resumeText)

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await model.stream(["human", `role:${role},resume:\n${resumeText}`]);
    let buffer = "";

    for await (const chunk of stream) {
      buffer += chunk.content;

      // Check for word boundaries (space, punctuation)
      const words = buffer.split(/(\s+)/); // includes whitespace as separate elements

      while (words.length > 1) {
        const word = words.shift(); // get the next word
        res.write(`data: ${word}\n\n`);
      }

      // The last chunk may be an incomplete word, so keep it in buffer
      buffer = words.join('');
    }

    // Flush the last word if any
    if (buffer.length > 0) {
      res.write(`data: ${buffer}\n\n`);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Resume review error:", err);
    res.status(500).send("Error processing resume");
  } finally {
    // Ensure file is always deleted
    try {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err.message}`);
        }
      });
    } catch (unlinkErr) {
      console.error("Error deleting resume file:", unlinkErr);
    }
  }
}

// --- Tagline Generation ---
export async function generateTagline({ product, type = "creative", audience = "general", style = "catchy" }, res) {
  const model = initModel("promptify-tagliner");

  const prompt = `Generate a ${type}, ${style} tagline for the following product targeting a ${audience} audience: ${product}`;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const stream = await model.stream(["human", prompt]);

  let buffer = "";

  for await (const chunk of stream) {
    buffer += chunk.content;

    // Check for word boundaries (space, punctuation)
    const words = buffer.split(/(\s+)/); // includes whitespace as separate elements

    while (words.length > 1) {
      const word = words.shift(); // get the next word
      res.write(`data: ${word}\n\n`);
    }

    // The last chunk may be an incomplete word, so keep it in buffer
    buffer = words.join('');
  }

  // Flush the last word if any
  if (buffer.length > 0) {
    res.write(`data: ${buffer}\n\n`);
  }

  res.write("data: [DONE]\n\n");
  res.end();
}
