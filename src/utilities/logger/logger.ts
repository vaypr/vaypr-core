import * as winston from 'winston';

export const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({ colorize: true }),
    new winston.transports.File({ filename: 'combined.log' }),
  ]
});
