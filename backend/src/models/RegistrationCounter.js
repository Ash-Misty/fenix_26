import mongoose from 'mongoose';

// A dedicated atomic counter prevents ID collisions after restarts, redeploys,
// or manual deletion of old registrations.
const registrationCounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence: { type: Number, required: true, default: 0, min: 0 },
}, { timestamps: true, versionKey: false });

export default mongoose.model('RegistrationCounter', registrationCounterSchema);
