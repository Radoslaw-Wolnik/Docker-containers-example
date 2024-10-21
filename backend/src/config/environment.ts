// src/config/environment.ts

import dotenv from 'dotenv';

dotenv.config();

const environment = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_db',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads/'
};

export default environment;