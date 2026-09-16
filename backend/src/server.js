import { createApp } from './app.js';
import { connectDB, disconnectDB } from './config/db.js';
import { initializeSheet } from './services/googleSheetsService.js';
import PricingConfig from './models/Event.js';
import Registration from './models/Registration.js';
import { initRegistrationIdCounter } from './utils/generateRegistrationId.js';
import logger from './utils/logger.js';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

export const app = createApp();

async function seedPricingConfig() {
  const existing = await PricingConfig.findOne();
  if (existing) {
    const legacyIplEvent = existing.events.find((event) => event.slug === 'ipl-action');
    const canonicalIplEvent = existing.events.find((event) => event.slug === 'ipl-auction');

    if (legacyIplEvent) {
      if (canonicalIplEvent) {
        existing.events = existing.events.filter((event) => event.slug !== 'ipl-action');
      } else {
        legacyIplEvent.slug = 'ipl-auction';
        legacyIplEvent.name = 'IPL Auction';
      }
      await existing.save();
    }
    return;
  }

  await PricingConfig.create({
    individualBaseFee: 250,
    individualExtraFee: 50,
    team2BaseFee: 450,
    team2ExtraFee: 50,
    team3BaseFee: 750,
    team3ExtraFee: 50,
    maxTechPerRegistration: 2,
    maxNonTechPerRegistration: 2,
    events: [
      { slug: 'paper-presentation', name: 'Paper Presentation', category: 'Technical', basePrice: 0, isActive: true },
      { slug: 'ai-battle', name: 'AI Battle', category: 'Technical', basePrice: 0, isActive: true },
      { slug: 'code-arena', name: 'Code Arena', category: 'Technical', basePrice: 0, isActive: true },
      { slug: 'pixel-perfect', name: 'Pixel Perfect', category: 'Technical', basePrice: 0, isActive: true },
      { slug: 'ipl-auction', name: 'IPL Auction', category: 'Non-Technical', basePrice: 0, isActive: true },
      { slug: 'game-event', name: 'Game Event', category: 'Non-Technical', basePrice: 0, isActive: true },
      { slug: 'meme-creation', name: 'Meme Creation', category: 'Non-Technical', basePrice: 0, isActive: true },
      { slug: 'treasure-hunt', name: 'Treasure Hunt', category: 'Non-Technical', basePrice: 0, isActive: true },
    ],
    workshops: [
      { slug: 'ai-workshop', name: 'AI Workshop', price: 100, isActive: true },
      { slug: 'web-dev-workshop', name: 'Web Development Workshop', price: 100, isActive: true },
      { slug: 'cybersecurity-workshop', name: 'Cybersecurity Workshop', price: 100, isActive: true },
    ],
  });
  logger.info('PricingConfig seeded with default events and workshops');
}

async function startServer() {
  try {
    await connectDB();
    await seedPricingConfig();
    await initRegistrationIdCounter(Registration);

    if (NODE_ENV === 'development') {
      logger.info('Initializing Google Sheets...');
      await initializeSheet().catch((err) => {
        logger.warn(`Google Sheets initialization skipped: ${err.message}`);
      });
    }

    const server = app.listen(PORT, () => {
      logger.info(`FENIX26 Backend running on port ${PORT} (${NODE_ENV})`);
    });

    const shutdown = async (signal) => {
      logger.info(`${signal} received. Shutting down gracefully...`);
      server.close(async () => {
        await disconnectDB();
        logger.info('Server closed. Goodbye.');
        process.exit(0);
      });

      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('unhandledRejection', (err) => {
      logger.error(`Unhandled Rejection: ${err.message}`, err);
    });

    process.on('uncaughtException', (err) => {
      logger.error(`Uncaught Exception: ${err.message}`, err);
      process.exit(1);
    });
  } catch (err) {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
}

startServer();

export default { app, startServer };
