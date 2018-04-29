const formatters = {
  "slack-hook": () => require("./slack-hook"),
  text: () => require("./text")
};

module.exports = function getFormatter(name = "text") {
  const formatter = formatters[name];
  if (!formatter) {
    throw new Error(`Unknown formatter ${name}`);
  }
  return formatter();
};
