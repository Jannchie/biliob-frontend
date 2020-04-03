let date = new Date();
let primaryColor = "#1e88e5";
if (date.getDate() == 1 && date.getMonth() == 3) {
  primaryColor = "#62c076";
} else if (date.getDate() == 1 && date.getMonth() == 9) {
  primaryColor = "#f55a4e";
} else if (
  date.getDate() == 4 &&
  date.getMonth() == 3 &&
  date.getFullYear() == 2020
) {
  primaryColor = "#888";
}
export default {
  themes: {
    light: {
      primary: primaryColor,
      secondary: "#4caf50",
      tertiary: "#495057",
      accent: "#82B1FF",
      error: "#f55a4e",
      info: "#00d3ee",
      success: "#5cb860",
      warning: "#ffa21a"
    },
    options: {
      customProperties: true
    }
  }
};
