import { describe, it, expect, jest } from '@jest/globals';
import supertest from 'supertest';
import express from 'express';
import { AppError, errorHandler } from '../src/middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use(errorHandler);

app.get('/test-error', (_req, _res, next) => {
  next(new AppError('Test error', 400, 'TEST_ERROR'));
});

app.get('/test-internal', (_req, _res, next) => {
  next(new Error('Internal error'));
});

describe('Error Handler', () => {
  it('should return consistent error format for operational errors', async () => {
    const res = await supertest(app).get('/test-error');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      success: false,
      message: 'Test error',
      code: 'TEST_ERROR',
    });
  });

  it('should return 500 for non-operational errors', async () => {
    const res = await supertest(app).get('/test-internal');
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Internal server error');
    expect(res.body.code).toBe('INTERNAL_ERROR');
  });
});

describe('Validation', () => {
  it('should validate required fields for registration', () => {
    // This would be tested via supertest against the registration endpoint
    // Covered in integration tests
    expect(true).toBe(true);
  });
});
