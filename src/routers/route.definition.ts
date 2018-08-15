import { RequestHandler } from 'express';
import { RouteMethod } from './route-method.type';

export class Route {
  // TODO: make this easier to use in TS without new
  constructor(
    public method: RouteMethod,
    public path: string,
    public handlers: RequestHandler | RequestHandler[]
  ){ }
}


