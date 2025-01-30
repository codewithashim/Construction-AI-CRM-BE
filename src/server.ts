import app from './app';
import { connectDB } from './shared/config/db-config';
import { envConfig } from './shared/config/env-config';
import { logger, errorLogger } from './shared/utils/logger';

/* 
|--------------------------------------------------------------------------
| Bootstrap Function - Application Entry Point
|--------------------------------------------------------------------------
| 1. Establishes a database connection.
| 2. Starts the Express server.
| 3. Handles graceful shutdown and error management.
*/
async function bootstrap() {
    try {
        /* 
    |--------------------------------------------------------------------------
    | Database Connection
    |--------------------------------------------------------------------------
    | Connects to the MongoDB database using the provided connection string.
    */
        await connectDB(envConfig.databaseUrl!);

        /* 
    |--------------------------------------------------------------------------
    | Start the Server
    |--------------------------------------------------------------------------
    | Initializes the Express application and listens on the specified port.
    */
        const server = app.listen(envConfig.port, () => {
            logger.info(
                `🚀 Server is running at http://localhost:${envConfig.port!}/api`,
            );
        });

        /* 
    |--------------------------------------------------------------------------
    | Handle Unhandled Promise Rejections
    |--------------------------------------------------------------------------
    | Ensures that any unhandled rejections do not crash the application abruptly.
    | Closes the server gracefully before exiting.
    */
        process.on('unhandledRejection', (error) => {
            if (server) {
                server.close(() => {
                    errorLogger.error('Unhandled Rejection:', error);
                    process.exit(1);
                });
            } else {
                process.exit(1);
            }
        });
    } catch (error) {
        errorLogger.error('❌ Failed to bootstrap the application', error);
        process.exit(1);
    }
}

/* 
|--------------------------------------------------------------------------
| Handle Uncaught Exceptions
|--------------------------------------------------------------------------
| Catches synchronous exceptions that are not handled by try/catch blocks.
| Logs the error and exits the application to prevent unpredictable behavior.
*/
process.on('uncaughtException', (error) => {
    errorLogger.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

/* 
|--------------------------------------------------------------------------
| Handle SIGTERM (Graceful Shutdown)
|--------------------------------------------------------------------------
| Ensures proper cleanup and shutdown when the application receives a SIGTERM signal.
| This is particularly useful in containerized environments (e.g., Docker, Kubernetes).
*/
process.on('SIGTERM', () => {
    logger.info('🛑 SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

// Start the application
bootstrap();
