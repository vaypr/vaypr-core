import { Request } from 'express';

/**
 * A controller function is a method or function that resolves data from a request,
 * given a specific type (I.E. Users, Posts, etc).
 * @example async function findUser(req) {
 *  return await usersResolver.find(req.params.id);
 * }
 */
export interface ControllerFunction<T> {
  (req: Request): Promise<T>;
}
