"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var QuotesMicroservice_1 = require('./QuotesMicroservice');
/**
 * Quotes process runner
 *
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-06
 */
var QuotesProcessRunner = (function (_super) {
    __extends(QuotesProcessRunner, _super);
    /**
     * Creates instance of quotes process runner
     */
    function QuotesProcessRunner() {
        _super.call(this, new QuotesMicroservice_1.QuotesMicroservice());
    }
    return QuotesProcessRunner;
}(pip_services_runtime_node_1.ProcessRunner));
exports.QuotesProcessRunner = QuotesProcessRunner;
