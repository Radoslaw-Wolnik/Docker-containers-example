import http from 'http';
import app from './app';
import connectDB from './utils/db-connection.util';
import logger from './utils/logger.util';
import environment from './config/environment';

const startServer = async () => {
  try {
    await connectDB();
    
    const server = http.createServer(app);
    server.listen(environment.PORT, () => {
      logger.info(`Server running on port ${environment.PORT}`);
    });

    process.on('unhandledRejection', (reason: Error) => {
      logger.error('Unhandled Rejection:', reason);
      process.exit(1);
    });

  } catch (error) {
    logger.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();