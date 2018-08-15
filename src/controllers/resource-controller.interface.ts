import { ControllerFunction } from './controller-fn.interface';

/**
 * A controller is a type of class or object that resolves data for the graphQL / REST interfaces by retrieving
 * data from a database, cache, or file storage layer.
 * @note Use this resolver if you have a resource or more then one CRUD operation in your resolver. Use the Resolver
 * for resolvers that perform only one CRUD operation.
 * @example class UsersResolver implements ResourceResolver {
 *
 *   async index(req) {
 *     return Users.getAll({ page: req.params.page, perPage: req.params.perPage })
 *   }
 *
 *   async read(req) {
 *     return await Users.get(req.params.id);
 *   }
 * }
 */
export interface ResourceController<T> {
  index?: ControllerFunction<T[]>;
  create?: ControllerFunction<T>;
  read?: ControllerFunction<T>;
  update?: ControllerFunction<T>;
  delete?: ControllerFunction<T>;
}
