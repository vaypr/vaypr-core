import { RequestHandler } from 'express';
import { RouteMethod } from './route-method.type';

export class VayprRoute {
  method: RouteMethod;
  path: string;
  handlers: RequestHandler[];
}


