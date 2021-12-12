import winston from 'winston';
import path from 'path';

const { combine, timestamp, label, printf } = winston.format;

const logPath = path.resolve(__dirname, '..', '..', 'logs');

const format = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'ЛР3' }),
    timestamp(),
    format
  ),
  transports: [
    new winston.transports.File({
      filename: path.resolve(logPath, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.resolve(logPath, 'info.log'),
      level: 'info'
    }),
  ],
});

export default logger;