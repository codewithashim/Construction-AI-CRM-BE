import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDB = async (databaseUrl: string): Promise<void> => {
  try {
    await mongoose.connect(databaseUrl);
    logger.info('🛢 Database connected successfully');
  } catch (error) {
    logger.error('❌ Failed to connect to the database', error);
    process.exit(1);
  }
};
