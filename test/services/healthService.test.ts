import HealthService from '../../src/services/healthService'; 

describe('HealthService', () => {
  let healthService: HealthService;

  beforeEach(() => {
    healthService = new HealthService();
  });

  it('should return the correct health status', async () => {
    const result = await healthService.checkHealth();
    expect(result).toEqual({ status: 'OK' });
  });
});
