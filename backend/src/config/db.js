import mongoose from 'mongoose';
import logger from '../utils/logger.js';

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
    logger.info(`MongoDB connected: ${conn.connection.host}:${conn.connection.port}`);
    return conn;
  } catch (err) {
    logger.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
}

export async function disconnectDB() {
  await mongoose.disconnect();
  logger.info('MongoDB disconnected');
}
