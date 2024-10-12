class HealthService {
    public async checkHealth(): Promise<{ status: string }> {
      return { status: 'OK' };
    }
  }
  
  export default HealthService;
  