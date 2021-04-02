import dotenv from 'dotenv';

const enviroment = dotenv.config();

if (!enviroment) {
  throw new Error('Config file was not found');
}

export default {
  // PORT: enviroment.parsed.PORT || 3005,
  // HOST: enviroment.parsed.HOST || '0.0.0.0',
  // SERVICE_PREFIX: enviroment.parsed.SERVICE_PREFIX || '/api',
  // VERSION: enviroment.parsed.VERSION || 1,
  PORT:  5000,
  HOST: '0.0.0.0',
  SERVICE_PREFIX: '/api',
  VERSION: 1,
}
