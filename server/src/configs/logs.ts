import winston from 'winston';
import path from 'path';

const { combine, timestamp, label, printf } = winston.format;

const logPath = path.resolve(__dirname, '..', '..', 'logs');

const format = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
    sql: 7
  },
  colors: {
    sql: 'blue'
  }
};
const logger = winston.createLogger({
  levels: customLevels.levels,
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
    new winston.transports.File({
      filename: path.resolve(logPath, 'sql.log'),
      level: 'sql'
    }),
  ],
});

export default logger;