// import { Model } from 'sequelize-typescript';

export abstract class Resolver<T> {
  // the models to be used in your resolver.
  // TODO: replace sequelize stuff with vaypr-model
  model: unknown;
}
