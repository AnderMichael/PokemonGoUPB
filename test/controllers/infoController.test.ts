import { Request, Response } from 'express';
import InfoController from '../../src/controllers/infoController';
import InfoService from '../../src/services/infoService';
import { SuccessHandler } from '../../src/handlers/successHandler';
import { HTTP_STATUS } from '../../src/constants/httpStatus';

jest.mock('../../src/services/infoService');
jest.mock('../../src/handlers/successHandler');
jest.mock('../../src/plugin/logger.plugin', () => ({
  buildLogger: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn(),
  })),
}));

describe('InfoController', () => {
  let infoController: InfoController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let infoServiceMock: jest.Mocked<InfoService>;
  let successHandlerMock: jest.Mocked<SuccessHandler>;

  beforeAll(() => {
    infoController = new InfoController();

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    infoServiceMock = InfoService.prototype as jest.Mocked<InfoService>;
    successHandlerMock = SuccessHandler.prototype as jest.Mocked<SuccessHandler>;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getInfo', () => {
    it('should retrieve info and send a success response', async () => {
      const expectedInfo = {
        name: 'Pokemon Go API - UPB',
        version: '1.0.0',
        description: 'API REST para catálogo de pokemones y notificaciones en la UPB',
      };
      infoServiceMock.getInfo.mockResolvedValueOnce(expectedInfo);

      await infoController.getInfo(mockRequest as Request, mockResponse as Response);

      expect(infoServiceMock.getInfo).toHaveBeenCalledTimes(1);
      expect(successHandlerMock.sendOkResponse).toHaveBeenCalledWith(
        mockResponse,
        expectedInfo,
        'Info retrieved successfully'
      );
    });

    it('should handle errors and send an error response', async () => {
      const errorMessage = 'Something went wrong';
      infoServiceMock.getInfo.mockRejectedValueOnce(new Error(errorMessage));

      await infoController.getInfo(mockRequest as Request, mockResponse as Response);

      expect(infoServiceMock.getInfo).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to retrieve info. Please try again later.',
      });
    });
  });
});