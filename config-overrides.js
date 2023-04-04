const webpack = require("webpack");

module.exports = function override(config) {
  config.ignoreWarnings = [/Failed to parse source map/];
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    events: false,
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    string_decoder: false,
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    url: require.resolve("url"),
    fs: false,
    assert: require.resolve("assert"),
    net: false,
    tls: false,
    zlib: false,
    bufferutil: false,
    "utf-8-validate": false,
    os: require.resolve("os-browserify"),
  });
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.resolve.fallback = fallback;
  return config;
};
