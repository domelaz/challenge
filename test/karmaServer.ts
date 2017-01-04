/**
 * Unit tests and coverage info with karma, remap-istanbul and webpack.
 *
 * Based on `webpack.commons.js`;
 *
 * To run standalone test -- pass spec file as first command-line argument;
 * Default is all `*.spec.ts` files inside `__tests__` folders
 *
 * Set TS_COVERAGE env variable to generate coverage report in coverage/html;
 */

"use strict";

import { Server as KarmaServer } from "karma";
import { omit } from "lodash";
import { readFileSync } from "fs";
import { resolve } from "path";
import { transpileModule } from "typescript";

/**
 * Let's achieve precise coverage reports on TypeScript sources
 *
 * While istanbul < 1.x do not understand source maps, remap-istanbul used here;
 *
 * @deprecated soon?
 * @see `coverage_complete` event handler below
 */
const remap = require("remap-istanbul/lib/remap");
const writeReport = require("remap-istanbul/lib/writeReport");

/**
 * Tests files mask for karma runner
 */
const [ , , singleTestFile ] = process.argv;
const keyFiles = singleTestFile
  ? resolve(singleTestFile)
  : "**/**/__tests__/*.spec.ts";

/**
 * Base Webpack settings
 */
const webpackCommons = require("../webpack.commons");

/**
 * Get clone of base webpack settings
 */
const webpackProps = webpackCommons.merge({});

/**
 * Equip karma config with code coverage stuff if env `TS_COVERAGE` set
 *
 * * append istanbul instrumenter to webpack postloaders (before mocha pass);
 * * add karma coverage reporter;
 */
const addCoverage = (config) => {
  const instrumenter = {
    exclude: ["node_modules", "test/", /\.spec\.ts$/],
    loader: "istanbul-instrumenter-loader",
    test: /\.ts$/,
  };

  let modules = config.webpack.module;
  Array.isArray(modules.postLoaders) ?
    modules.postLoaders.push(instrumenter) :
    modules.postLoaders = [instrumenter];

  config.coverageReporter = {
    dir: "../coverage/",
    reporters: [
      { type: "in-memory" },
    ],
  };

  config.reporters.push("coverage");
};


/**
 * Customize browsers a little
 */
const customLaunchers = {
  chromeAGC: {
    base: "Chrome",
    flags: [
      "--auto-open-devtools-for-tabs",
      "--expose-gc",
    ],
  },
  ff: {
    base: "Firefox",
    flags: [
      "-jsconsole",
    ],
  },
};

/**
 * Karma stuff
 */
const defaults = {
  autoWatch: true,
  basePath: "src/",
  browsers: ["chromeAGC"/**, "ff"*/],
  colors: true,
  concurrency: Infinity,
  configFile: "",
  customLaunchers,
  exclude: [],
  files: [ keyFiles ],
  frameworks: ["chai", "mocha"],
  logLevel: "OFF", // 0 also works as config.LOG_DEBUG,
  mime: {
    "text/x-typescript": ["ts"],
  },
  port: 9876,
  preprocessors: {
    [keyFiles]: ["webpack"],
  },
  reporters: ["spec"],
  singleRun: false,
  webpack: omit(webpackProps, "entry"), // karma watches the test entry points
  webpackMiddleware: {
    stats: {
      colors: true,
    },
  },
};

if (typeof(process.env.TS_COVERAGE) !== "undefined") {
  addCoverage(defaults);
}

/**
 * Remap and write coverage report in html format
 *
 * first, we get "authorized" source maps from `typescript` compiler;
 * then, pass these source maps to `remap-istanbul` along with coverage report
 * via it `code` field;
 */
const writeCoverageHTML = (browser, coverageReport) => {
  // Get common `tsc` options and ensure that source maps will be inlined
  const tsCommons = JSON.parse(readFileSync("tsconfig.json").toString());
  const compilerOptions = tsCommons.compilerOptions;
  compilerOptions.sourceMap = false;
  compilerOptions.inlineSourceMap = true;

  Object.keys(coverageReport).forEach(fileName => {
    const tsSource = readFileSync(fileName).toString();
    const source = transpileModule(tsSource, { compilerOptions, fileName });
    // No need to pass all source code, inlined source map (last line) is enough
    const inlinedSourceMap = source.outputText.split("\n").pop();
    coverageReport[fileName].code = inlinedSourceMap;
  });

  const collector = remap(coverageReport);
  writeReport(collector, "html", {}, "coverage/html");
};

const server = new KarmaServer(defaults, exitCode => {
  console.log("Karma has exited with " + exitCode);
  process.exit(exitCode);
});

server.on("coverage_complete", writeCoverageHTML);

server.start();
