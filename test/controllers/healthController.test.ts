import { HealthController } from '../../src/controllers/healthController';
import { Request, Response } from 'express';
import HealthService from '../../src/services/healthService';
import { SuccessHandler } from '../../src/handlers/successHandler';

describe('HealthController', () => {
  let healthController: HealthController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let healthServiceMock: jest.SpyInstance;
  let successHandlerMock: jest.SpyInstance;

  beforeEach(() => {
    healthController = new HealthController();
    req = {}; 
    res = {    
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    
    healthServiceMock = jest.spyOn(HealthService.prototype, 'checkHealth');
    successHandlerMock = jest.spyOn(SuccessHandler.prototype, 'sendOkResponse');
  });

  afterEach(() => {
    jest.restoreAllMocks(); 
  });

  it('should return 200 and the health status when health check is successful', async () => {
    const healthStatus = { status: 'healthy' };
    healthServiceMock.mockResolvedValue(healthStatus);

    await healthController.getHealth(req as Request, res as Response);

    expect(healthServiceMock).toHaveBeenCalledTimes(1);
    expect(successHandlerMock).toHaveBeenCalledWith(res, healthStatus, 'Health check successful');
  });

  it('should return 500 if the health check fails', async () => {
    const error = new Error('Health check failed');
    healthServiceMock.mockRejectedValue(error);

    await healthController.getHealth(req as Request, res as Response);

    expect(healthServiceMock).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Health check failed. Please try again later.',
    });
  });
});
