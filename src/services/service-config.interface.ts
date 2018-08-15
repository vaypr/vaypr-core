import { RouteMethod } from '../routers';

export interface ServiceConfig {
  rest?: boolean;
  restMethods?: RouteMethod[];
}
