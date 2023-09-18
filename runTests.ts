/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-template-curly-in-string */
// browserstack:chrome@99.0:Windows 10
// import { loggerErrorFunction } from './src/utils/helper.ts';

const createTestCafe = require('testcafe');

async function createTestCafeInstance() {
  let testcafe;
  await createTestCafe()
    .then((tc) => {
      testcafe = tc;
      return tc
        .createRunner()
        .browsers('browserstack:chrome@101.0:Windows 11')
        .src('./src/tests')
        .filter((testName, fixtureName, fixturePath, testMeta, fixtureMeta) => fixtureMeta.fixtureType === 'smoke')
        .concurrency(1)
        .screenshots({
          path: './src/screenshots/',
          takeOnFails: true,
          pathPattern: '${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png',
          fullPage: true,
        })
        .video('./videos', {
          singleFile: false,
          failedOnly: false,
          ffmpegPath: 'D://RFP//ReactJs-Application//ffmpeg//bin',
          pathPattern: '${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.mp4',
        }, {
          r: 20,
          aspect: '4:3',
        })
        .reporter([
          {
            name: 'cucumber-json',
          },
          {
            name: 'slack-custom',
            options: {
              channel: '#dra-automation-reports',
            },
          },
        ])
        .run({
          skipJsErrors: true,
          skipUncaughtErrors: true,
          disablePageCaching: true,
          quarantineMode: { successThreshold: 1, attemptLimit: 2 },
          debugMode: false,
          debugOnFail: false,
          selectorTimeout: 40000,
          assertionTimeout: 40000,
          pageLoadTimeout: 40000,
          pageRequestTimeout: 60000,
          ajaxRequestTimeout: 60000,
          speed: 1,
        });
    })
    .then((failedCount) => {
      console.log(`DRA Automation Tests failedCount : ${failedCount}`);
      testcafe.close();
      process.exit(failedCount ? 1 : 0);
    })
    .catch((err) => {
      console.error(err);
      testcafe.close();
      process.exit(1);
    });
}

async function runTests() {
  await createTestCafeInstance();
}

runTests();
