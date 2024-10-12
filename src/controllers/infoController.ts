import { Request, Response, Router } from 'express';
import { buildLogger } from '../plugin/logger.plugin';
import { SuccessHandler } from '../handlers/successHandler';
import InfoService from '../services/infoService';
import { HTTP_STATUS } from '../constants/httpStatus';

export class InfoController {
  public router: Router;
  private logger: any;
  private infoService: InfoService;
  private successHandler: SuccessHandler;

  constructor() {
    this.router = Router();
    this.logger = buildLogger('InfoController');
    this.infoService = new InfoService();
    this.successHandler = new SuccessHandler();
    this.routes();
  }

  public async getInfo(req: Request, res: Response): Promise<void> {
    try {
      this.logger.info('Fetching API info');
      const info = await this.infoService.getInfo();
      this.successHandler.sendOkResponse(res, info, 'Info retrieved successfully');
    } catch (error: any) {
      this.logger.error(`Failed to retrieve info: ${error.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to retrieve info. Please try again later.',
      });
    }
  }

  private routes() {
    this.router.get('/info', this.getInfo.bind(this));
  }
}

export default InfoController;
