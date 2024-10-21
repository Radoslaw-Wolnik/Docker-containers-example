import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import environment from './config/environment';
import logger from './utils/logger.util';

import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
import blogPostRoutes from './routes/blog.routes';
import authRoutes from './routes/auth.routes';
import healthRoutes from './routes/health.routes';
import jobRoutes from './routes/job.routes';
import siteSettingsRoutes from './routes/site-settings.routes';

import { errorHandler } from './middleware/error.middleware';
import { addRequestId } from './middleware/request-id.middleware';

const app = express();

app.use(cors({
  origin: environment.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(addRequestId);
app.use(logger.logRequest);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blog', blogPostRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/site-settings', siteSettingsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Global error handler
app.use(errorHandler);

export default app;