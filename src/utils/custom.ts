/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-useless-path-segments */
import { Selector, t } from 'testcafe';
import { loggerFunction, loggerErrorFunction } from '../utils/helper';

export const clickElement = async (selector: Selector, successMessage: string) => {
  try {
    await t.click(selector);
    await loggerFunction(successMessage);
  } catch (error) {
    loggerErrorFunction(error);
  }
};

export const typeText = async (selector: Selector, input: string, successMessage: string) => {
  try {
    await t.typeText(selector, input);
    await loggerFunction(successMessage);
  } catch (error) {
    loggerErrorFunction(error);
  }
};
