const report = require('multiple-cucumber-html-reporter');

const projectName = 'Automation Test Report';
const projectVersion = process.env.npm_package_version;
const reportGenerationTime = new Date().toISOString();
report.generate({
  reportName: ' AUTOMATION METRICS',
  jsonDir: 'cucumber-json-reports',
  reportPath: 'cucumber-json-reports/html',
  openReportInBrowser: true,
  disableLog: true,
  displayDuration: true,
  displayReportTime: true,
  durationInMS: true,
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: `${projectName}` },
      { label: 'Release', value: `${projectVersion}` },
      { label: 'Report Generation Time', value: `${reportGenerationTime}` },
    ],
  },
});
