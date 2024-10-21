import express from 'express';
import cors from 'cors';
import { FRONTEND_URL } from './config/environment';
import logger from './utils/logger.util';

import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
import blogPostRoutes from './routes/blog.routes';

import { errorHandler } from './middleware/error.middleware';
import { addRequestId } from './middleware/request-id.middleware';

const app = express();

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(addRequestId);
app.use(logger.logRequest);

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blog', blogPostRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

export default app;