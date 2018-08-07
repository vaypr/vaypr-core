import * as winston from 'winston';

export const logger = new winston.Logger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ]
});
