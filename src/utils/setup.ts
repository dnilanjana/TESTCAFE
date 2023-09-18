/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { tearDown, initialSetup } from '../utils/helper';

const globalAny:any = global;
// eslint-disable-next-line import/prefer-default-export
export const fixture: any = (fixtureName:any) => globalAny.fixture(fixtureName)`${fixtureName}`
  // eslint-disable-next-line no-unused-vars
  .beforeEach(async () => {
    await initialSetup(fixtureName);
  })
  .afterEach(async () => {
    // TODO clean up
    await tearDown();
  });
