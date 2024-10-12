import winston from 'winston';

export const buildLogger = (moduleName: string) => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.label({ label: moduleName }),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message, label }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
    ],
  });
};