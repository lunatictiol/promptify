import {
  generateArticle,
  reviewResumeFile,
  generateTagline
} from '../services/ai.service.js';


// --- Generate Article ---
export const handleGenerateArticle = async (req, res) => {
  try {
    const article = await generateArticle(req.body);
    res.status(200).json({ article });
  } catch (err) {
    console.error("Article generation error:", err);
    res.status(500).json({ error: "Failed to generate article" });
  }
};

// --- Review Resume (upload file) ---
export const handleReviewResume = async (req, res) => {
  try {
    const file = req.file;
    const role = req.body.job_role;
    console.log("form data",role)

     if (!role) {
      return res.status(400).json({ error: 'role not provided' });
    }
    if (!file || !file.path) {
      return res.status(400).json({ error: 'Resume file not provided' });
    }


    if (file.size > 2 * 1024 * 1024) { // 2MB
      return res.status(400).json({ error: 'File size exceeds 2MB limit' });
    }

   const review =  await reviewResumeFile(file.path,role); 
     res.status(200).json({ review });
  } catch (err) {
    console.error("Resume review controller error:", err);
    res.status(500).send("Error reviewing resume");
  }
};

// --- Generate Tagline ---
export const handleGenerateTagline = async (req, res) => {
  try {
    await generateTagline(req.query, res); // sends stream
  } catch (err) {
    console.error("Tagline generation error:", err);
    res.status(500).send("Error generating tagline");
  }
};
