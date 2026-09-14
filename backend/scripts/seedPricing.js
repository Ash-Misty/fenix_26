import mongoose from 'mongoose';
import { config } from 'dotenv';
import PricingConfig from '../src/models/Event.js';

config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fenix26';

const events = [
  { slug: 'paper-presentation', name: 'Paper Presentation', category: 'Technical', basePrice: 0, isActive: true },
  { slug: 'ai-battle', name: 'AI Battle', category: 'Technical', basePrice: 0, isActive: true },
  { slug: 'code-arena', name: 'Code Arena', category: 'Technical', basePrice: 0, isActive: true },
  { slug: 'pixel-perfect', name: 'Pixel Perfect', category: 'Technical', basePrice: 0, isActive: true },
  { slug: 'ipl-action', name: 'IPL Action', category: 'Non-Technical', basePrice: 0, isActive: true },
  { slug: 'game-event', name: 'Game Event', category: 'Non-Technical', basePrice: 0, isActive: true },
  { slug: 'meme-creation', name: 'Meme Creation', category: 'Non-Technical', basePrice: 0, isActive: true },
  { slug: 'treasure-hunt', name: 'Treasure Hunt', category: 'Non-Technical', basePrice: 0, isActive: true },
];

const workshops = [
  { slug: 'ai-workshop', name: 'AI Workshop', price: 100, isActive: true },
  { slug: 'web-dev-workshop', name: 'Web Development Workshop', price: 100, isActive: true },
  { slug: 'cybersecurity-workshop', name: 'Cybersecurity Workshop', price: 100, isActive: true },
];

async function seedPricing() {
  try {
    await mongoose.connect(MONGO_URI, { bufferCommands: false });
    console.log('MongoDB connected');

    await PricingConfig.deleteMany({});
    console.log('Existing PricingConfig documents deleted');

    const pricingConfig = new PricingConfig({
      individualBaseFee: 250,
      individualExtraFee: 50,
      team2BaseFee: 450,
      team2ExtraFee: 50,
      team3BaseFee: 750,
      team3ExtraFee: 50,
      maxTechPerRegistration: 2,
      maxNonTechPerRegistration: 2,
      events,
      workshops,
    });

    await pricingConfig.save();
    console.log('PricingConfig seeded successfully');
    console.log('Events:', events.length);
    console.log('Workshops:', workshops.length);

    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seedPricing();