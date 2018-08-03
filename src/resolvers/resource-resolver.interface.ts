import { ResolverFunction } from './resolver-fn.interface';

/**
 * A resolver is a type of class or object that resolves data for the graphQL / REST interfaces by retrieving
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
export interface ResourceResolver<T> {
  index?: ResolverFunction<T[]>;
  create?: ResolverFunction<T>;
  read?: ResolverFunction<T>;
  update?: ResolverFunction<T>;
  delete?: ResolverFunction<T>;
}
