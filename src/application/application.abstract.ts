import { VayprAppplicationConfig } from './application-config.interface';
import { VayprServer } from '../server';

export abstract class VayprApplication {
  abstract config: VayprAppplicationConfig;
  public server: VayprServer;

  public async create() {
    this.server = new VayprServer({
      port: this.config.port
    });
    await this.server.start();
  }
}
