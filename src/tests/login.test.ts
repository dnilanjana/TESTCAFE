/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { awsController as awsUtils } from '-aws';
import { configurations } from '../utils/env';

require('dotenv').config();

const userName: string = awsUtils.getValueFromEnv('USER_NAME');
const password: string = awsUtils.getValueFromEnv('PASSWORD');
const environment: string = awsUtils.getValueFromEnv('ENVIRONMENT');
const baseUrl: string = configurations[environment].url;
console.log(`baseUrl =  ${baseUrl}`);

fixture.meta({ fixtureType: 'smoke' })('Logging to DRA QA')
  .page(baseUrl);

test('Login test', async (testHarness) => {
  await testHarness
    .typeText('#okta-signin-username', userName)
    // console.log('User Name')
    .wait(1000)
    .typeText('#okta-signin-password', password)
    .wait(1000)
    .click('#okta-signin-submit')
    .wait(10000);

  await testHarness.expect('ddd').eql('ddd');

})
