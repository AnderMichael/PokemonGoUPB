import { Response } from 'express';
import { HTTP_STATUS } from '../constants/httpStatus';

export class SuccessHandler {
  public sendOkResponse(res: Response, data: any, message: string, statusCode: number = HTTP_STATUS.OK): void {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }
}