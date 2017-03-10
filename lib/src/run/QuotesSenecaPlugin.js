"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var QuotesMicroservice_1 = require('./QuotesMicroservice');
var QuotesSenecaPlugin = (function (_super) {
    __extends(QuotesSenecaPlugin, _super);
    function QuotesSenecaPlugin() {
        _super.call(this, 'quotes', new QuotesMicroservice_1.QuotesMicroservice());
    }
    return QuotesSenecaPlugin;
}(pip_services_runtime_node_1.SenecaPlugin));
exports.QuotesSenecaPlugin = QuotesSenecaPlugin;
