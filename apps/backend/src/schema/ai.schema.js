import { z } from "zod";

// --- Article Schema ---
export const articleSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  tone: z.string().optional(),
  length: z.string().optional(),
  audience: z.string().optional(),
  style: z.string().optional(),
});

// --- Tagline Schema ---
export const taglineSchema = z.object({
  product: z.string().min(1, "Product is required"),
  type: z.string().optional(),
  audience: z.string().optional(),
  style: z.string().optional(),
});
