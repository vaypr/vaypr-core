import { Router } from "../routers";

import { ServiceConfig } from './service-config.interface';

/**
 * A service in Vaypr is a wrapper and constructor for controllers, 
 * resolvers, and types to create a graphQL and rest service for a resource.
 * I.e. the UsersService contains all rest controllers, schemas, and the resource resolver
 * for CRUD operations of a User, and then exports all these back to your application for 
 * bootstrapping.
 */
export abstract class Service {
  abstract path: string;
  // if REST is enabled, property for accessing generated express routes
  public router?: Router;
  
  constructor(config: ServiceConfig) { }

  public create() {

  }
}
