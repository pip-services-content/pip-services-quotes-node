"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var QuotesFactory_1 = require('../build/QuotesFactory');
/**
 * Quotes microservice class.
 *
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-09
 */
var QuotesMicroservice = (function (_super) {
    __extends(QuotesMicroservice, _super);
    /**
     * Creates instance of quotes microservice.
     */
    function QuotesMicroservice() {
        _super.call(this, "pip-services-quotes", QuotesFactory_1.QuotesFactory.Instance);
    }
    return QuotesMicroservice;
}(pip_services_runtime_node_1.Microservice));
exports.QuotesMicroservice = QuotesMicroservice;
