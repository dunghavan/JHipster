"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
require("core-js");
require("zone.js/dist/zone");
require("zone.js/dist/long-stack-trace-zone");
require("zone.js/dist/async-test");
require("zone.js/dist/fake-async-test");
require("zone.js/dist/sync-test");
require("zone.js/dist/proxy");
require("zone.js/dist/jasmine-patch");
require("rxjs");
require("intl/locale-data/jsonp/en-US.js");
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
var testsContext = require.context('./', true, /\.spec/);
testsContext.keys().forEach(testsContext);
//# sourceMappingURL=entry.js.map