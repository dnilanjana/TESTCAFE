/* eslint-disable spaced-comment */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Role, Selector, t } from 'testcafe';
import { awsController as awsUtils } from 'aws';
import { configurations } from '../utils/env';
import { loggerFunction } from '../utils/helper';
import { clickElement } from '../utils/custom';

require('dotenv').config();

class DRALoginPO {
  /**
   * @description
   * Setting a url route
   */

  private userName: string = awsUtils.getValueFromEnv('USER_NAME');

  private password: string = awsUtils.getValueFromEnv('PASSWORD');

  public environment: string = awsUtils.getValueFromEnv('ENVIRONMENT');

  public baseUrl: string = configurations[this.environment].url;

  public usernameInput = Selector('#okta-signin-username');

  public passwordInput = Selector('#okta-signin-password');

  public submit = Selector('#okta-signin-submit');

  public message = Selector('.internalHeader').innerText;

  // eslint-disable-next-line no-unused-vars, no-shadow
  public defaultUser = Role(this.baseUrl, async (t) => {
    await this.login(this.userName, this.password);
  });

  async login(userid: string, pwd: string) {
    await t.typeText(this.usernameInput, userid, {});
    await t.typeText(this.passwordInput, pwd, {});
    await clickElement(this.submit, 'Logged in to DRA application successfully');
    await loggerFunction('Logged in to DRA application successfully');
  }
}

export default DRALoginPO;
