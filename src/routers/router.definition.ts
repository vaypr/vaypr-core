import { Router } from 'express';

import { VayprRoute } from './route.definition';
import { logger } from '../utilities';

export abstract class VayprRouter {
  abstract path: string;
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
    if (Array.isArray(route.handlers)) {
      console.log('handlers', route.handlers);
      for(let i = 0; i < route.handlers.length; i++) {
        this.router[route.method](route.path, route.handlers[i]);
      }
    } else {
      this.router[route.method](route.path, route.handlers);
    }
  }
}
