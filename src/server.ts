import express, { Application, Request, Response } from 'express';
import apiRoutes from './api';
import { errorHandler } from './handlers/errorHandler';
import { buildLogger } from './plugin/logger.plugin';
import { configDotenv } from 'dotenv';

configDotenv();

const app: Application = express();
const logger = buildLogger('Server');

app.use(express.json());

app.use('/api/v1', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Pokemon Go API is running');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en el puerto ${PORT}`);
});
