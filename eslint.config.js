// eslint.config.js
module.exports = {
    root: true,
    env: {
      browser: true,
      node: true,
      es2021: true, // or whatever ES version you target
    },
    extends: [
      "eslint:recommended",
      // Optionally add prettier or other style guides if you use them
      // "plugin:prettier/recommended",
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // Add custom rules here
      "no-unused-vars": "warn",
      "no-console": "off",
      // e.g. "semi": ["error", "always"],
    },
  };
  