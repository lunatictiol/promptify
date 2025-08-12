import express from 'express';
import multer from 'multer';
import {
  handleGenerateArticle,
  handleReviewResume,
  handleGenerateTagline
} from '../controllers/ai.controller.js';

import { validate } from '../middleware/validate.js';
import { articleSchema, taglineSchema } from '../schema/ai.schema.js';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to save uploaded files
  },
  filename: (req, file, cb) => {
    // Generate a unique filename (e.g., with timestamp)
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Routes
router.post('/generate-article', validate(articleSchema), handleGenerateArticle);
router.post('/review-resume', upload.single('resume'), handleReviewResume);
router.post('/generate-tagline', validate(taglineSchema), handleGenerateTagline);

export default router;
