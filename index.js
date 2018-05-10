#! /usr/bin/env node

process.on('unhandledRejection', reason => {
	console.error('Unhandled rejection', reason);
});

process.on('uncaughtException', error => {
	console.error('Uncaught exception', error);
	process.exit(1);
});

const argv = require('./lib/cli').cli.argv;
const tool = require(`./tools/${argv._[0]}`)(argv);
const feed = require('./lib/feed')(tool.cli);
feed.stream(tool.processor);
