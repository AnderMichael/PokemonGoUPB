import { Router } from 'express';
import HealthController from '../controllers/healthController';
import InfoController from '../controllers/infoController';

const router = Router();

const healthController = new HealthController();
const infoController = new InfoController();

router.get('/health', healthController.router);
router.get('/info', infoController.router);

export default router;
