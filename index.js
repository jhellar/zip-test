#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');

const fhcInit = require('./lib/fhc-init');
const fhcImportApp = require('./lib/fhc-import-app');

program
  .version(pkg.version)
  .description(pkg.description)
  .option('-h, --host <address>', 'Host - required')
  .option('-u, --username <username>', 'Username - required')
  .option('-p, --password <password>', 'Password - required')
  .option('-e, --environment <environment>', 'Environment to be used for app deployment - required')
  .option('-z, --zip <file>', 'Zip file to be imported - required')
  .option('-g, --project <guid>', 'Project guid - required')
  .option('-t, --title <title>', 'App title - required')
  .parse(process.argv);

if (!program.host || !program.username || !program.password ||
  !program.environment || !program.zip || !program.project ||
  !program.title) {
  program.outputHelp();
  process.exit();
}

fhcInit(program)
  .then(forwardParams)
  .then(fhcImportApp)
  .then(result => {
    console.log(JSON.stringify(JSON.parse(result), null, 2));
  })
  .catch(error => {
    console.log(error);
  });

function forwardParams() {
  return {
    projectId: program.project,
    title: program.title,
    type: 'cloud_nodejs',
    source: program.zip,
    env: program.env
  }
}
