import { Router } from 'express';
import routes from './routes';

const apiRouter = Router();

apiRouter.use('/', routes);

export default apiRouter;