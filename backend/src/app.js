import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xssClean from 'xss-clean';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { errorHandler } from './middleware/errorHandler.js';
import registrationRoutes from './routes/registrationRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import adminProfileRoutes from './routes/adminProfileRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import workshopRegistrationRoutes from './routes/workshopRegistrationRoutes.js';
import logger from './utils/logger.js';
import swaggerOptions from './swagger.js';

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export function createApp() {
  const app = express();

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https:"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
      },
    },
  }));

  const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  app.use(cors(corsOptions));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  app.use(xssClean());

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests. Please try again later.',
      code: 'RATE_LIMIT_EXCEEDED',
    },
  });

  app.use('/api/health', (_req, res) => {
    res.status(200).json({ success: true, status: 'healthy' });
  });

  app.use('/api', apiLimiter);
  app.use('/api/registrations', registrationRoutes);
  app.use('/api/workshop-registrations', workshopRegistrationRoutes);
  app.use('/api/payments', paymentRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/admin', dashboardRoutes);
  app.use('/api/admin', eventRoutes);
  app.use('/api/admin', adminProfileRoutes);
  app.use('/api/contacts', contactRoutes);
  app.use('/api/announcements', announcementRoutes);

  app.use(errorHandler);

  return app;
}
