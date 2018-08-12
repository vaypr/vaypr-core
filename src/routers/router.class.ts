import { Router } from 'express';

import { VayprRoute } from './route.definition';
import { logger } from '../utilities';

export abstract class VayprRouter {
  abstract baseRoute: string;
  abstract routes: VayprRoute[];
  public router: Router;

  constructor() {
    this.router = Router();
  }

  initRoutes() {
    logger.info('initializing ' + this.routes.length + ' routes for ' + this.constructor.name);
    this.routes.forEach(route => this.addRoute(route));
  }

  addRoute(route: VayprRoute) {
    this.router[route.method](route.path, ...route.handlers);
  }
}
