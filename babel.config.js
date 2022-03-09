module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "react-native-reanimated/plugin",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-private-methods",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: [
            "API_KEY",
            "AUTH_DOMAIN",
            "PROJECT_ID",
            "STORAGE_BUCKET",
            "MESSAGING_SENDER_ID",
            "APP_ID",
            "DATABASE_URL",
          ],
          safe: false,
          allowUndefined: true,
        },
      ],
      ["@babel/plugin-transform-flow-strip-types"],
    ],
    presets: [
      "babel-preset-expo",
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-typescript",
    ],
  };
};
