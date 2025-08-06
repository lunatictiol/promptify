import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import {validate} from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../schema/auth.schema.js';

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh-token', authController.refreshToken);
export default router;
