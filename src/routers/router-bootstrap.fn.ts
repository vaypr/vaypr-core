import { Descendant, VayprError } from '../utilities';
import { Router } from './router.definition';

export interface BootstrapRoutesOptions {
  swallowErrors: boolean;
}

export const bootsrapRoutesDefaultOptions: BootstrapRoutesOptions = {
  swallowErrors: true
}

export function bootstrapRouters<T extends Router>(
  routers: Descendant<T>[], 
  options: BootstrapRoutesOptions = bootsrapRoutesDefaultOptions
): T[] {
  try {
    const routes = routers.map(router => bootstrapRouter(router));
    return routes ? routes.filter(route => !!route) : [];
  } catch(err) {
    const error = options.swallowErrors ? new VayprError(err) : new VayprError(err, 'CRASH');
    throw error;
    return [];
  }
}

export function bootstrapRouter<T extends Router>(Router: Descendant<T>): T {
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
