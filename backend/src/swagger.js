/** @type {import('swagger-jsdoc').Options} */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FENIX26 Symposium API',
      version: '1.0.0',
      description:
        'Complete API for FENIX26 Symposium registration, payment, and admin management. Backend for the FENIX26 Symposium website.',
      contact: {
        name: 'FENIX26 Admin',
        email: 'admin@fenix26.in',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://api.fenix26.in',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Enter your JWT token in the format: Bearer <token>',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
  swaggerdir: './docs',
};

export default options;
