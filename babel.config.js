module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }],
      ['module-resolver', {
        alias: {
          '@lit-protocol/contracts': '@lit-protocol/contracts/build',
          '@lit-protocol/constants': '@lit-protocol/constants/build',
          crypto: 'react-native-crypto',
          stream: 'stream-browserify',
          buffer: '@craftzdog/react-native-buffer',
        },
      }],
    ],
  };
};
