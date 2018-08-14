import { RequestHandler } from 'express';

import { VayprAppplicationConfig } from './application-config.interface';
import { VayprServer } from '../server';
import { VayprService } from '../services';
import { bootstrapRouters, builtInRoutes, VayprRouter } from '../routers';
import { Descendant } from '../utilities';

/**
 * An application is a class or object for describing a Vaypr application.
 * It contains properties for configuration, the server, services, middleware,
 * and routers.
 */

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
    this.addBuiltInRoutes();
    this.addMyRoutes();
    await this.server.start();
  }

  protected addRoutes(routes: VayprRouter[]) {
    routes.forEach(router => {
      this.server.addRouter(router.path, router.router);
    });
  }

  private addBuiltInRoutes() {
    this.addRoutes(bootstrapRouters(builtInRoutes));
  }

  private addMyRoutes() {
    if (this.routers) {
      this.addRoutes(bootstrapRouters(this.routers));
    }
  }
}
