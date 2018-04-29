
const RED = "#f74e09";
const BLUE = "#2a95ca";
const GREEN = "#46ae3d";
const ORANGE = "#fea017";
const PURPLE = "#6355c3";

module.exports = {
	getColorForType,
};

function getColorForType(type) {
  return {
      bug: RED,
      improvement: BLUE,
      "new feature": GREEN,
      task: ORANGE,
    }[type.toLowerCase()] || PURPLE; 
}