import { Request, Response, Router } from 'express';
import { buildLogger } from '../plugin/logger.plugin';
import { SuccessHandler } from '../handlers/successHandler';
import HealthService from '../services/healthService';
import { HTTP_STATUS } from '../constants/httpStatus';

export class HealthController {
  public router: Router;
  private logger: any;
  private healthService: HealthService;
  private successHandler: SuccessHandler;

  constructor() {
    this.router = Router();
    this.logger = buildLogger('HealthController');
    this.healthService = new HealthService();
    this.successHandler = new SuccessHandler();
    this.routes();
  }

  public async getHealth(req: Request, res: Response): Promise<void> {
    try {
      this.logger.info('Checking health status');
      const status = await this.healthService.checkHealth();
      this.successHandler.sendOkResponse(res, status, 'Health check successful');
    } catch (error: any) {
      this.logger.error(`Health check failed: ${error.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Health check failed. Please try again later.',
      });
    }
  }

  private routes() {
    this.router.get('/health', this.getHealth.bind(this));
  }
}

export default HealthController;
