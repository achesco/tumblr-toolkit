#! /usr/bin/env node

const cli = require('./lib/cli');

require(`./${cli._[0]}`)(cli);
