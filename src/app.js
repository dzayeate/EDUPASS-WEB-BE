require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes/index');
// const expressListEndpoints = require('express-list-endpoints');

const { forgotPasswordJob } = require('./utils/cron');

const app = express();

const swaggerOption = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API EDUPASS',
      version: '1.0.0',
      description: 'Description of API EDUPASS',
    },
    server: [
      {
        uri: process.env.BASE_URL,
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
    message: 'SELAMAT DATANG DI API EDUPASS',
  });
});

forgotPasswordJob.start();

app.use(router);

// const endpoints = expressListEndpoints(app);
// console.log(endpoints);

module.exports = app;
