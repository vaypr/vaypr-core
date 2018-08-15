import { ControllerFunction } from './controller-fn.interface';

/**
 * A resolver is a type of class or object that resolves data for the graphQL / REST interfaces by retrieving
 * data from a database, cache, or file storage layer.
 * @note Use this resolver for non resource (CRUD) type resolvers. Use the ResourceResolver for resolvers that
 * perform more then one CRUD operation.
 * @example class GetAllUsersResolver implements Resolver {
 *  async process(req) {
 *    return await Users.get(req.params.id);
 * }
 * }
 */
export interface Controller<T> {
  resolve: ControllerFunction<T>;
}
