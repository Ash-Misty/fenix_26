import mongoose from 'mongoose';

const eventPricingSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Technical', 'Non-Technical'] },
  basePrice: { type: Number, required: true, default: 0 },
  isActive: { type: Boolean, default: true },
});

const workshopPricingSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  isActive: { type: Boolean, default: true },
});

const pricingConfigSchema = new mongoose.Schema({
  individualBaseFee: { type: Number, default: 300 },
  individualExtraFee: { type: Number, default: 0 },
  team2BaseFee: { type: Number, default: 550 },
  team2ExtraFee: { type: Number, default: 0 },
  team3BaseFee: { type: Number, default: 800 },
  team3ExtraFee: { type: Number, default: 0 },
  maxTechPerRegistration: { type: Number, default: 2 },
  maxNonTechPerRegistration: { type: Number, default: 2 },
  events: [eventPricingSchema],
  workshops: [workshopPricingSchema],
});

const PricingConfig = mongoose.model('PricingConfig', pricingConfigSchema, 'pricingConfig');
export default PricingConfig;
