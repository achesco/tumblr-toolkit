#! /usr/bin/env node

process.on('unhandledRejection', reason => {
	console.error('Unhandled rejection', reason);
});

process.on('uncaughtException', error => {
	console.error('Uncaught exception', error);
	process.exit(1);
});

const argv = require('./lib/cli').cli.argv;
const command = argv._[0];

const tool = require(`./tools/${command}`)(argv);

// ugly as hell 
if (!Object.keys(require('./api')).includes(command)) {
	const feed = require('./lib/feed')(tool.cli);
	feed.stream(tool.processor);
}
