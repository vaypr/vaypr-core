import { Request } from 'express';

/**
 * A resolver function is a method or function that resolves data from a request,
 * given a specific type (I.E. Users, Posts, etc).
 * @example async function findUser(req) {
 *  return await Users.find(req.params.id);
 * }
 */
export interface ResolverFunction<T> {
  (req: Request): Promise<T>;
}
