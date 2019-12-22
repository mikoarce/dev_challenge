/* eslint func-names: off */
module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
  ];
  const plugins = [
    [
      'semantic-ui-react-transform-imports', {
        convertMemberImports: true,
        addCssImports: true,
      },
    ],
  ];

  if (process.env.NODE_ENV === 'test') {
    plugins.push(['istanbul']);
  }

  return {
    plugins,
    presets,
  };
};
