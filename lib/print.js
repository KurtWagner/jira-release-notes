module.exports = function print(msg) {
  const output = typeof msg === "object" ? JSON.stringify(msg) : msg;
  process.stdout.write(output + "\n");
};
