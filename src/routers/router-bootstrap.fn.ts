import { Descendant } from '../utilities';
import { VayprRouter } from './router.definition';
import { logger } from '../utilities';

export interface BootstrapRoutesOptions {
  swallowErrors: boolean;
}

export const bootsrapRoutesDefaultOptions: BootstrapRoutesOptions = {
  swallowErrors: true
}

export function bootstrapRouters<T extends VayprRouter>(
  routers: Descendant<T>[], 
  options: BootstrapRoutesOptions = bootsrapRoutesDefaultOptions
): T[] {
  try {
    const routes = routers.map(router => bootstrapRouter(router));
    return routes ? routes.filter(route => !!route) : [];
  } catch(err) {
    logger.error(err);
    if (!options.swallowErrors) {
      throw new Error(err);
    }
    return [];
  }
}

export function bootstrapRouter<T extends VayprRouter>(Router: Descendant<T>): T {
  try {
    if (Router.constructor) {
      const route = new Router();
      route.initRoutes();
      return route;
    } else {
      throw new Error('Non es6 class based extension of router constructor is not yet supported.');
    }
  } catch(err) {
    throw new Error('Error bootstrapping routes ' + Router.name + err);
  }
}
