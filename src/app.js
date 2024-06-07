const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes/index');

require('dotenv').config();

const app = express();

const swaggerOption = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API GDSC UNIVERSITAS PASUNDAN',
      version: '1.0.0',
      description: 'DEVELOPMENT BY GDSC UNPAS',
    },
    server: [
      {
        uri: process.env.BASE_URL || 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/swagger/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOption);
app.use(
  '/api',
  swaggerUi.serveFiles(swaggerSpec),
  swaggerUi.setup(swaggerSpec),
);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'SELAMAT DATANG DI API GDSC UNPAS',
  });
});

app.use(router);

module.exports = app;
