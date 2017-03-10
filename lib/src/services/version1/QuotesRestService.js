"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var QuotesRestService = (function (_super) {
    __extends(QuotesRestService, _super);
    function QuotesRestService() {
        _super.call(this, QuotesRestService.Descriptor);
    }
    QuotesRestService.prototype.link = function (components) {
        this._logic = components.getOnePrior(this, new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.BusinessLogic, "pip-services-quotes", "*", "*"));
        _super.prototype.link.call(this, components);
    };
    QuotesRestService.prototype.getQuotes = function (req, res) {
        this._logic.getQuotes(req.params.correlation_id, new pip_services_runtime_node_4.FilterParams(req.params), new pip_services_runtime_node_5.PagingParams(req.params), this.sendResult(req, res));
    };
    QuotesRestService.prototype.getRandomQuote = function (req, res) {
        this._logic.getRandomQuote(req.params.correlation_id, new pip_services_runtime_node_4.FilterParams(req.params), this.sendResult(req, res));
    };
    QuotesRestService.prototype.getQuoteById = function (req, res) {
        this._logic.getQuoteById(req.params.correlation_id, req.params.quoteId, this.sendResult(req, res));
    };
    QuotesRestService.prototype.createQuote = function (req, res) {
        this._logic.createQuote(req.params.correlation_id, req.body, this.sendCreatedResult(req, res));
    };
    QuotesRestService.prototype.updateQuote = function (req, res) {
        this._logic.updateQuote(req.params.correlation_id, req.params.quoteId, req.body, this.sendResult(req, res));
    };
    QuotesRestService.prototype.deleteQuote = function (req, res) {
        this._logic.deleteQuote(req.params.correlation_id, req.params.quoteId, this.sendDeletedResult(req, res));
    };
    QuotesRestService.prototype.register = function () {
        this.registerRoute('get', '/quotes', this.getQuotes);
        this.registerRoute('get', '/quotes/random', this.getRandomQuote);
        this.registerRoute('get', '/quotes/:quoteId', this.getQuoteById);
        this.registerRoute('post', '/quotes', this.createQuote);
        this.registerRoute('put', '/quotes/:quoteId', this.updateQuote);
        this.registerRoute('delete', '/quotes/:quoteId', this.deleteQuote);
    };
    /**
     * Unique descriptor for the QuotesRestService component
     */
    QuotesRestService.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Services, "pip-services-quotes", "rest", "1.0");
    return QuotesRestService;
}(pip_services_runtime_node_3.RestService));
exports.QuotesRestService = QuotesRestService;
