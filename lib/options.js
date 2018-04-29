const program = require("commander");
const { version } = require("../package.json");

program
  .version(version)
  .option("-u, --username [username]", "JIRA username")
  .option(
    "-p, --password [password]",
    "JIRA password (please use generated API key)"
  )
  .option("-h, --host [host]", 'JIRA Host. e.g, "yourname.jira.com"')
  .option("-v, --verbose", "", false)
  .option(
    "-f, --format [format]",
    'Format output. This can be "slack-hook" or "text".'
  )
  .option("--filter-version [version]", "JIRA version to look up issues for.")
  .parse(process.argv);

module.exports = program;
