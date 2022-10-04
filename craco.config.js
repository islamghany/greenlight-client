const cracoAlias = require('craco-alias')

module.exports = {
  style: {
    postcss: {
      loaderOptions: (postcssLoaderOptions) => {
        postcssLoaderOptions.postcssOptions.plugins = [
          require('tailwindcss/nesting'),
          require('tailwindcss'),
          require('postcss-import'),
          require('autoprefixer'),
          require('postcss-extend'),
          require('postcss-reporter'),
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              features: { 'nesting-rules': false },
              stage: 0,
            },
          ],
        ]

        return postcssLoaderOptions
      },
    },
  },
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: './',
        /* tsConfigPath should point to the file where "baseUrl" and "paths"
        are specified*/
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
}
