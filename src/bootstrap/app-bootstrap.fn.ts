import { VayprApplication } from '../application';
import { Descendant, logger } from '../utilities';

export async function bootstrapApplication<T extends VayprApplication>(App: Descendant<T>): Promise<void> {
  try {
    if (App.constructor) {
      const startTime = new Date();
      const app = new App();
      await app.run();
      logger.info(`Started appication in ${new Date().getTime() - startTime.getTime()}ms`);
    } else {
      throw new Error('Non es6 class based extension of application constructor is not yet supported.');
    }
  } catch(err) {
    logger.error('Error bootstrapping Application', err);
  }
}
