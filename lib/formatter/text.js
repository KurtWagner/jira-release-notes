const pluralize = require("pluralize");
const chalk = require("chalk");
const { getColorForType } = require("../utility/colors");

module.exports = {
  format
};

function format({ versionName, issues }) {
  const types = {};

  if (!issues[0]) {
    throw new Error(`No issues found under ${versionName}`);
  }
  const versionDetails = issues[0].versions.find(version => {
    return version.name === versionName;
  });

  for (const issue of issues) {
    if (!types[issue.typeName]) {
      types[issue.typeName] = [];
    }
    types[issue.typeName].push(issue);
  }

  const lines = [`${chalk.bold(versionName)} ${chalk.italic("Release Notes")}`];
  if (versionDetails && versionDetails.description) {
    lines.push(chalk.bold(versionDetails.description));
  }
  Object.keys(types)
    .sort()
    .forEach(typeName => {
      const issues = types[typeName];

      const displayTypeName = pluralize(typeName, issues.length).toUpperCase();
      const color = getColorForType(typeName);

      lines.push("");
      lines.push(chalk.hex(color).bold(displayTypeName));
      for (const issue of issues) {
        const details = chalk.gray(`(Reporter: ${issue.reporter.displayName})`);
        lines.push(`• ${formatKey(issue)} - ${issue.summary} ${details}`);
      }
    });
  return lines.join("\n");
}

function formatKey(issue) {
  return chalk.bold(issue.key);
}
