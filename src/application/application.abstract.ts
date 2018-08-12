import { RequestHandler } from 'express';

import { VayprAppplicationConfig } from './application-config.interface';
import { VayprServer } from '../server';
import { VayprService } from '../services';
import { bootstrapRouters, builtInRoutes, VayprRouter } from '../routers';
import { Descendant, logger } from '../utilities';

export abstract class VayprApplication {
  // the configuration value for the application.
  abstract config: VayprAppplicationConfig;
  // the application's server.
  public server: VayprServer;
  // an arry for your classes that extend VayprService
  protected services: Descendant<VayprService>[];
  // middleware to your application
  protected middleWare: RequestHandler[];
  // default application routes (not attached to a service)
  protected routers: Descendant<VayprRouter>[];

  // start the application
  public async run() {
    this.server = new VayprServer({
      port: this.config.port
    });
    await Promise.all([
      this.addBuiltInRoutes(),
      this.addMyRoutes()
    ])
    await this.server.start();
  }

  protected async addRoutes(routes: VayprRouter[]) {
    routes.forEach(router => {
      logger.info('adding router', router.baseRoute);
      this.server.addRouter(router.router);
    });
  }

  private async addBuiltInRoutes() {
    await this.addRoutes((await bootstrapRouters(builtInRoutes)));
  }

  private async addMyRoutes() {
    if (this.routers) {
      await this.addRoutes((await bootstrapRouters(this.routers)));
    }
  }
}
