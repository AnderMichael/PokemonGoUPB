import InfoService from "../../src/services/infoService"

describe('InfoService', () => {
    let service: InfoService;
  
    beforeEach(() => {
      service = new InfoService();
    });
  
    it('should return the correct info object', async () => {
      const expectedInfo = {
        name: 'Pokemon Go API - UPB',
        version: '1.0.0',
        description: 'API REST para catálogo de pokemones y notificaciones en la UPB',
      };
  
      const result = await service.getInfo();
      expect(result).toEqual(expectedInfo);
    });
  });