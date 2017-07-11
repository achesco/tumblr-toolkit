#! /usr/bin/env node

const argv = require('./lib/cli').cli.argv;
const tool = require(`./tools/${argv._[0]}`)(argv);
const feed = require('./lib/feed')(tool.cli);
feed.stream(tool.processor);
