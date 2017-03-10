/**
 * @file Quotes process launcher
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global */

'use strict';

var _ = require('lodash');
var QuotesProcessRunner = require('../lib/src/run/QuotesProcessRunner').QuotesProcessRunner;

var runner = new QuotesProcessRunner();

runner.startWithDefaultConfig('../config/config.yaml');