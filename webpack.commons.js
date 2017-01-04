/**
 * Common webpack settings
 */
"use strict";

const _ = require("lodash");
const path = require("path");

const options = {};

/**
 * Sources subdir
 */
const src = process.env.TS_SRC_ROOT || "src";

const commons = (options) => {
  return {
    entry: [
      path.resolve(__dirname, src, "index.ts"),
    ],

    module: {
      /**
       * Note about loaders order: sake for simplicity I will reference it by
       * index in derived configs. So predictable order is important.
       */
      loaders: [{
        test: /\.ts$/,
        loaders: ["source-map", "ts"]
      }],
    },

    output: {
      publicPath: "/",
    },

    resolve: {
      extensions: ["", ".ts", ".js"],
    },
  };
};

module.exports = {
  customize: options,
  merge: (args) => _.merge({}, commons(options), args),
};
