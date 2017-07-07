#! /usr/bin/env node

const cli = require('./lib/cli');

require(`./tools/${cli._[0]}`)(cli);
