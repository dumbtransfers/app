module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
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
