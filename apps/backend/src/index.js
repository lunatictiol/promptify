import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.route.js'; 
import {errorHandler} from './middleware/errorHandler.js';
import httpLogger from './middleware/httpLogger.js';
import auth from './middleware/auth.js';
import aiRoutes from './routes/ai.route.js'

dotenv.config();
console.log('ACCESS_TOKEN_SECRET:', process.env.JWT_SECRET, process.env.JWT_REFRESH_SECRET);

const app = express();
connectDB(); // Connect to DB

app.use(express.json());
// Logging incoming requests
app.use(httpLogger)
// Routes
app.use('/api/auth', authRoutes);


app.use(auth)

app.use("/api/ai",aiRoutes)




// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
