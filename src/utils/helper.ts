/* eslint-disable max-len */
/* eslint-disable no-useless-concat */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
import { Selector, t } from 'testcafe';

const log4js = require('log4js');

export const randomNums = (quantity: number, max: number): number[] => {
  const set: Set<number> = new Set();
  while (set.size < quantity) {
    set.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(set).sort((a, b) => a - b);
};

export const elementByXPath = Selector(xpath => {
  const iterator = document
    .evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  const items = [];
  let item = iterator.iterateNext();
  while (item) {
    items.push(item);
    item = iterator.iterateNext();
  }
  return items;
});

export const subscriptionName = () => {
  const result = Math.random().toString(36).substring(2, 7);
  const subscription = 'Subscription ';
  const finalname = subscription + result;
  return finalname;
};

export const getRandomPackage = () => {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  return timestamp;
};

export async function initialSetup(fixtureName: string) {
  console.log(`**************************** ${fixtureName} - ` + 'START' + ' ****************************');
}

export async function tearDown() {
  console.log('End of testcase');
}

export async function loggerFunction(message: string) {
  // const logger = log4js.getLogger('stepdef');

  log4js.configure({
    appenders: { File: { type: 'file', filename: './/src///DRAlogs//DRA.log' }, console: { type: 'error', filename: './/src///DRAlogs//DRAerror.log' } },
    categories: { default: { appenders: ['File'], level: 'info' } },
  });
  const logger = log4js.getLogger();
  logger.level = 'info';
  logger.info(message);
}

export async function loggerErrorFunction(message?: unknown) {
  // const logger = log4js.getLogger('stepdef');

  log4js.configure({
    appenders: { File: { type: 'file', filename: './/src///DRAlogs//DRAerror.log' }, console: { type: 'error', filename: './/src///DRAlogs//DRAerror.log' } },
    categories: { default: { appenders: ['File'], level: 'error' } },
  });
  const logger = log4js.getLogger();
  logger.level = 'error';
  logger.error(message);
}

export async function log(successmessage: string) {
  // const logger = log4js.getLogger('stepdef');
  try {
    await loggerFunction(successmessage);
  } catch (error) {
    loggerErrorFunction(error);
  }
}

export const clickElement = async (selector: Selector, successMessage: string) => {
  try {
    await t.click(selector);
    await loggerFunction(successMessage);
  } catch (error) {
    loggerErrorFunction(error);
  }
};
