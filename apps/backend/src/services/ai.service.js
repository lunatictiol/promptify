import { ChatOllama } from "@langchain/ollama";
import { HumanMessage } from "langchain/schema";
import { extractTextFromFile } from "../utils/fileParser.js"; // create this util
import fs from "fs";

const initModel = (model, temperature = 0.7) => {
  return new ChatOllama({ model, temperature });
};

// --- Article Generation ---
export async function generateArticle({ topic, tone = "neutral", length = "medium", audience = "general", style = "informative" }) {
  const model = initModel("llama3");

  const prompt = `Write a ${length} article for a ${audience} audience about "${topic}" in a "${tone}" tone and "${style}" style.`;
  const response = await model.call([new HumanMessage(prompt)]);
  return response.content;
}

// --- Resume Review (file input) ---
export async function reviewResumeFile(filePath, res) {
  try {
    const resumeText = await extractTextFromFile(filePath);

    const model = initModel("phi3");

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await model.stream([new HumanMessage(`Review this resume:\n${resumeText}`)]);

    for await (const chunk of stream) {
      res.write(`data: ${chunk.content}\n\n`);
    }

    res.write("data: [DONE]\n\n");
    res.end();

    // Optionally clean up uploaded file
    fs.unlink(filePath, () => {});
  } catch (err) {
    console.error("Resume review error:", err);
    res.status(500).send("Error processing resume");
  }
}

// --- Tagline Generation ---
export async function generateTagline({ product, type = "creative", audience = "general", style = "catchy" }, res) {
  const model = initModel("mistral");

  const prompt = `Generate a ${type}, ${style} tagline for the following product targeting a ${audience} audience: ${product}`;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const stream = await model.stream([new HumanMessage(prompt)]);

  for await (const chunk of stream) {
    res.write(`data: ${chunk.content}\n\n`);
  }

  res.write("data: [DONE]\n\n");
  res.end();
}
