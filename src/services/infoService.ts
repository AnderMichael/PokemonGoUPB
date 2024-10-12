class InfoService {
    public async getInfo(): Promise<{ name: string; version: string; description: string }> {
      return {
        name: 'Pokemon Go API - UPB',
        version: '1.0.0',
        description: 'API REST para catálogo de pokemones y notificaciones en la UPB',
      };
    }
  }
  
  export default InfoService;
  