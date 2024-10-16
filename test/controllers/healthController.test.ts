import { HealthController } from '../../src/controllers/healthController';
import sinon from 'sinon';
import { Request, Response } from 'express';
import HealthService from '../../src/services/healthService';
import { SuccessHandler } from '../../src/handlers/successHandler';

describe('HealthController', () => {
  let healthController: HealthController;
  let req: any;
  let res: any;
  let healthServiceStub: sinon.SinonStub;
  let successHandlerStub: sinon.SinonStub;

  beforeEach(() => {
    healthController = new HealthController();
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    healthServiceStub = sinon.stub(HealthService.prototype, 'checkHealth');
    successHandlerStub = sinon.stub(SuccessHandler.prototype, 'sendOkResponse');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return 200 and the health status when health check is successful', async () => {
    const healthStatus = { status: 'healthy' };
    healthServiceStub.resolves(healthStatus);

    await healthController.getHealth(req as Request, res as Response);

    expect(healthServiceStub.calledOnce).toBe(true);
    expect(successHandlerStub.calledWith(res, healthStatus, 'Health check successful')).toBe(true);
  });

  it('should return 500 if the health check fails', async () => { 
    const error = new Error('Health check failed');
    healthServiceStub.rejects(error);

    await healthController.getHealth(req as Request, res as Response);

    expect(healthServiceStub.calledOnce).toBe(true);
    expect(res.status.calledWith(500)).toBe(true);
    expect(res.json.calledWith({
      success: false,
      message: 'Health check failed. Please try again later.',
    })).toBe(true);
  });
});
