import { describe, it, expect, jest } from '@jest/globals';
import supertest from 'supertest';
import mongoose from 'mongoose';
import Registration from '../src/models/Registration.js';
import PricingConfig from '../src/models/Event.js';
import { app } from '../src/server.js';

jest.mock('../src/services/googleSheetsService.js', () => ({
  appendRegistrationToSheet: jest.fn().mockResolvedValue(true),
  updateRegistrationInSheet: jest.fn().resolvedValue(true),
  initializeSheet: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../src/services/qrService.js', () => ({
  generateUPIPayload: jest.fn().mockReturnValue('upi://pay?pa=test@upi&pn=Test&am=250.00&cu=INR'),
  generateQRCode: jest.fn().mockResolvedValue('data:image/png;base64,test'),
}));

jest.mock('../src/services/emailService.js', () => ({
  sendConfirmationEmail: jest.fn().mockResolvedValue(true),
  sendAdminNotification: jest.fn().mockResolvedValue(true),
}));

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fenix26_test';

beforeAll(async () => {
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
  await Registration.deleteMany({});
  await PricingConfig.deleteMany({});
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
      { slug: 'ipl-action', name: 'IPL Action', category: 'Non-Technical', basePrice: 0, isActive: true },
      { slug: 'game-event', name: 'Game Event', category: 'Non-Technical', basePrice: 0, isActive: true },
      { slug: 'meme-creation', name: 'Meme Creation', category: 'Non-Technical', basePrice: 0, isActive: true },
      { slug: 'treasure-hunt', name: 'Treasure Hunt', category: 'Non-Technical', basePrice: 0, isActive: true },
    ],
    workshops: [
      { slug: 'ai-workshop', name: 'AI Workshop', price: 100, isActive: true },
      { slug: 'web-dev-workshop', name: 'Web Development Workshop', price: 100, isActive: true },
    ],
  });
  jest.clearAllMocks();
});

describe('POST /api/registrations', () => {
  it('should create a registration', async () => {
    const res = await supertest(app)
      .post('/api/registrations')
      .send({
        teamName: 'Test Team',
        teamLeader: 'John Doe',
        email: 'test@fenix26.in',
        phone: '9876543210',
        college: 'Test College',
        department: 'CSE',
        year: 3,
        registrationType: 'Individual',
        selectedEvents: ['paper-presentation'],
        foodPreference: 'Vegetarian',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.registrationId).toMatch(/^F26-\d{4}-\d{6}$/);
    expect(res.body.data.totalAmount).toBeDefined();
    expect(res.body.data.payment.status).toBe('pending');
    expect(res.body.data.payment.qrCode).toBeDefined();
    expect(res.body.message).toBe('Registration created successfully');
  });

  it('should reject registration with missing required fields', async () => {
    const res = await supertest(app)
      .post('/api/registrations')
      .send({ teamName: 'Test' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.code).toBe('VALIDATION_ERROR');
  });

  it('should reject duplicate email registrations', async () => {
    await supertest(app)
      .post('/api/registrations')
      .send({
        teamName: 'Test Team',
        teamLeader: 'John Doe',
        email: 'dup@fenix26.in',
        phone: '9876543210',
        college: 'Test College',
        department: 'CSE',
        year: 3,
        registrationType: 'Individual',
        selectedEvents: ['paper-presentation'],
      });

    const res = await supertest(app)
      .post('/api/registrations')
      .send({
        teamName: 'Another Team',
        teamLeader: 'Jane Doe',
        email: 'dup@fenix26.in',
        phone: '9876543211',
        college: 'Test College',
        department: 'CSE',
        year: 3,
        registrationType: 'Individual',
        selectedEvents: ['ai-battle'],
      });

    expect(res.status).toBe(409);
    expect(res.body.code).toBe('DUPLICATE_REGISTRATION');
  });

  it('should reject invalid email', async () => {
    const res = await supertest(app)
      .post('/api/registrations')
      .send({
        teamName: 'Test Team',
        teamLeader: 'John Doe',
        email: 'invalid-email',
        phone: '9876543210',
        college: 'Test College',
        department: 'CSE',
        year: 3,
        registrationType: 'Individual',
        selectedEvents: ['paper-presentation'],
      });

    expect(res.status).toBe(400);
  });

  it('should reject invalid phone', async () => {
    const res = await supertest(app)
      .post('/api/registrations')
      .send({
        teamName: 'Test Team',
        teamLeader: 'John Doe',
        email: 'test@fenix26.in',
        phone: '1234',
        college: 'Test College',
        department: 'CSE',
        year: 3,
        registrationType: 'Individual',
        selectedEvents: ['paper-presentation'],
      });

    expect(res.status).toBe(400);
  });

  it('should reject invalid year', async () => {
    const res = await supertest(app)
      .post('/api/registrations')
      .send({
        teamName: 'Test Team',
        teamLeader: 'John Doe',
        email: 'test@fenix26.in',
        phone: '9876543210',
        college: 'Test College',
        department: 'CSE',
        year: 10,
        registrationType: 'Individual',
        selectedEvents: ['paper-presentation'],
      });

    expect(res.status).toBe(400);
  });

  it('should reject when no events selected', async () => {
    const res = await supertest(app)
      .post('/api/registrations')
      .send({
        teamName: 'Test Team',
        teamLeader: 'John Doe',
        email: 'test@fenix26.in',
        phone: '9876543210',
        college: 'Test College',
        department: 'CSE',
        year: 3,
        registrationType: 'Individual',
        selectedEvents: [],
      });

    expect(res.status).toBe(400);
  });
});

describe('GET /api/registrations/:registrationId', () => {
  it('should retrieve a registration', async () => {
    const createRes = await supertest(app)
      .post('/api/registrations')
      .send({
        teamName: 'Test Team',
        teamLeader: 'John Doe',
        email: 'fetch@fenix26.in',
        phone: '9876543210',
        college: 'Test College',
        department: 'CSE',
        year: 3,
        registrationType: 'Individual',
        selectedEvents: ['paper-presentation'],
      });

    const regId = createRes.body.data.registrationId;
    const res = await supertest(app).get(`/api/registrations/${regId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.registrationId).toBe(regId);
  });

  it('should return 404 for non-existent registration', async () => {
    const res = await supertest(app).get('/api/registrations/F26-2026-999999');

    expect(res.status).toBe(404);
    expect(res.body.code).toBe('REGISTRATION_NOT_FOUND');
  });
});

describe('POST /api/registrations/:registrationId/payment-screenshot', () => {
  it('should reject upload without file', async () => {
    const createRes = await supertest(app)
      .post('/api/registrations')
      .send({
        teamName: 'Test Team',
        teamLeader: 'John Doe',
        email: 'upload@fenix26.in',
        phone: '9876543210',
        college: 'Test College',
        department: 'CSE',
        year: 3,
        registrationType: 'Individual',
        selectedEvents: ['paper-presentation'],
      });

    const regId = createRes.body.data.registrationId;
    const res = await supertest(app).post(`/api/registrations/${regId}/payment-screenshot`);

    expect(res.status).toBe(400);
    expect(res.body.code).toBe('NO_FILE');
  });
});

describe('Health Check', () => {
  it('should return healthy status', async () => {
    const res = await supertest(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe('healthy');
  });
});
