// src/utils/db-connection.util.ts

import mongoose from 'mongoose';
import environment from '../config/environment';
import logger from './logger.util';

// Function to connect to MongoDB
const connectToMongoDB = async (): Promise<typeof mongoose> => {
  return mongoose.connect(environment.database.uri, environment.database.options);
};

// Function to handle retry logic
const connectDB = async (): Promise<void> => {
  for (let attempt = 1; attempt <= environment.MAX_CONNECTION_ATTEMPTS; attempt++) {
    try {
      await connectToMongoDB();
      logger.info('Connected to MongoDB');
      return;
    } catch (error) {
      logger.error(`Attempt ${attempt} - Error connecting to MongoDB:`, (error as Error).message);
      if (attempt < environment.MAX_CONNECTION_ATTEMPTS) {
        logger.info(`Retrying in ${environment.CONNECTION_RETRY_DELAY / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, environment.CONNECTION_RETRY_DELAY));
      } else {
        logger.error('Failed to connect to MongoDB after multiple attempts');
        process.exit(1);
      }
    }
  }
};

// Function for health check
export const checkDBHealth = (): string => {
  const dbStatus = mongoose.connection.readyState;
  switch (dbStatus) {
    case 0:
      return 'Disconnected';
    case 1:
      return 'Connected';
    case 2:
      return 'Connecting';
    case 3:
      return 'Disconnecting';
    default:
      return 'Unknown';
  }
};

export default connectDB;