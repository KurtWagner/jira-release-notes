#!/usr/bin/env node
'use strict';

const logger = require("./lib/logger");
const jira = require("./lib/jira");
const formatter = require("./lib/formatter");
const print = require("./lib/print");
const options = require("./lib/options");

logger.isVerbose = options.verbose;

process.on("uncaughtException", logger.error);

const client = jira.connect({
  username: options.username,
  password: options.password,
  host: options.host
});

const versionName = options.filterVersion;
client
  .getReleasedIssues({ versionName })
  .then(issues => {
    const { format } = formatter(options.format);

    logger.onlyTTY.info("STARTING OUTPUT <<<\n");
    print(format({ versionName, issues }));
    logger.onlyTTY.info(">>> ENDING OUTPUT\n");
  })
  .catch(e => {
    if (!e.response || !e.statusCode) {
      logger.error(e);
      return;
    }
    logger.error(e.statusCode, e.response.body);
  });
