const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');

const isProduction = process.env.NODE_ENV === 'production';

const baseConfig = {
  input: 'src/DatePicker.js',
  plugins: [
    nodeResolve({
      browser: true,
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['> 1%', 'last 2 versions', 'not dead', 'not ie <= 11'],
            },
            modules: false,
          },
        ],
      ],
    }),
  ],
  external: [],
};

const configs = [
  // UMD build
  {
    ...baseConfig,
    output: {
      file: 'dist/datelite.js',
      format: 'umd',
      name: 'DatePicker',
      sourcemap: true,
    },
  },
  // UMD minified build
  {
    ...baseConfig,
    output: {
      file: 'dist/datelite.min.js',
      format: 'umd',
      name: 'DatePicker',
      sourcemap: true,
    },
    plugins: [...baseConfig.plugins, terser()],
  },
  // ES module build
  {
    ...baseConfig,
    output: {
      file: 'dist/datelite.esm.js',
      format: 'es',
      sourcemap: true,
    },
  },
  // CommonJS build
  {
    ...baseConfig,
    output: {
      file: 'dist/datelite.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
  },
];

module.exports = configs;