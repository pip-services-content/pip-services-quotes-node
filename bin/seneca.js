/**
 * @file Quotes seneca plugin
 * @copyright Digital Living Software Corp. 2014-2016
 */

var QuotesSenecaPlugin = require('../lib/src/run/QuotesSenecaPlugin').QuotesSenecaPlugin;
var plugin = new QuotesSenecaPlugin();

module.exports = plugin.entry();