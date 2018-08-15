import { RequestHandler } from 'express';

import { AppplicationConfig } from './application-config.interface';
import { Server } from '../server';
import { Service } from '../services';
import { bootstrapRouters, builtInRoutes, Router } from '../routers';
import { Descendant } from '../utilities';

/**
 * An application is a class or object for describing a Vaypr application.
 * It contains properties for configuration, the server, services, middleware,
 * and routers.
 */

export abstract class Application {
  // the configuration value for the application.
  abstract config: AppplicationConfig;
  // the application's server.
  public server: Server;
  // an arry for your classes that extend VayprService
  protected services: Descendant<Service>[];
  // middleware to your application
  protected middleWare: RequestHandler[];
  // default application routes (not attached to a service)
  protected routers: Descendant<Router>[];

  /**
   * TODO: flesh this out so people can use object composition rather then class extension
   */
  // static create(application: VayprApplication) {
  //   return class extends
  // }

  // start the application
  public async run() {
    this.server = new Server({
      port: this.config.port
    });
    this.addBuiltInRoutes();
    this.addMyRoutes();
    await this.server.start();
  }

  protected addRoutes(routes: Router[]) {
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
