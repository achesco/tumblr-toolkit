#! /usr/bin/env node

const argv = require('./lib/cli').cli.argv;
require(`./tools/${argv._[0]}`)(argv);
