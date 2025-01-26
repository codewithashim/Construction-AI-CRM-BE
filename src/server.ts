import app from './app';
import { connectDB } from './shared/config/db-config';
import { env_config } from './shared/config/env-config';
import { logger, errorlogs } from './shared/utils/logger';

async function bootstrap() {
  try {
    // Connect to the database
    await connectDB(env_config.database_url!);

    // Start the server
    const server = app.listen(env_config.port, () => {
      logger.info(`🚀 Server is running at http://localhost:${env_config.port!}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', error => {
      if (server) {
        server.close(() => {
            errorlogs.error('Unhandled Rejection:', error);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  } catch (error) {
    errorlogs.error('Failed to bootstrap the application', error);
    process.exit(1);
  }
}

process.on('uncaughtException', error => {
    errorlogs.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

bootstrap();
