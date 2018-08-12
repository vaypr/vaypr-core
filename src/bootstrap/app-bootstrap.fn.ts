import { VayprApplication } from '../application';
import { Descendant, logger } from '../utilities';

export async function bootstrapApplication<T extends VayprApplication>(App: Descendant<T>): Promise<void> {
  try {
    if (App.constructor) {
      const app = new App();
      await app.run();
    } else {
      throw new Error('Non es6 class based extension of application constructor is not yet supported.');
    }
  } catch(err) {
    logger.error('Error bootstrapping Application', err);
  }
}
