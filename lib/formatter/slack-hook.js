const pluralize = require("pluralize");
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

  const lines = [`:iphone: *${versionName}* _Released_`];
  if (versionDetails && versionDetails.description) {
    lines.push(`> ${versionDetails.description}`);
  }
  const attachments = [];
  Object.keys(types)
    .sort()
    .forEach(typeName => {
      const issues = types[typeName];

      const attachmentLines = [];
      for (const issue of issues) {
        attachmentLines.push(
          `• ${formatKey(issue)} - ${issue.summary} (Reporter: ${
            issue.reporter.displayName
          })`
        );
      }
      attachments.push({
        title: pluralize(typeName, issues.length).toUpperCase(),
        text: attachmentLines.join("\n"),
        color: getColorForType(typeName)
      });
    });
  return { text: lines.join("\n"), attachments };
}

function formatKey(issue) {
  return `*<${issue.link}|${issue.key}>*`;
}
