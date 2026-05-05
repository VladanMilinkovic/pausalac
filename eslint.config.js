const expoConfig = require("eslint-config-expo/flat");

module.exports = [
  ...expoConfig,
  {
    ignores: ["dist/**", "build/**", "coverage/**"],
  },
  {
    rules: {
      "no-console": "warn",
    },
  },
];
