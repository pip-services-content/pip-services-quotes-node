"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var QuotesCommandSet_1 = require('./QuotesCommandSet');
var QuotesController = (function (_super) {
    __extends(QuotesController, _super);
    function QuotesController() {
        _super.call(this, QuotesController.Descriptor);
    }
    QuotesController.prototype.link = function (components) {
        // Locate reference to quotes persistence component
        this._db = components.getOneRequired(new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-quotes", '*', '*'));
        _super.prototype.link.call(this, components);
        // Add commands
        var commands = new QuotesCommandSet_1.QuotesCommandSet(this);
        this.addCommandSet(commands);
    };
    QuotesController.prototype.getQuotes = function (correlationId, filter, paging, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quotes', callback);
        this._db.getQuotes(correlationId, filter, paging, callback);
    };
    QuotesController.prototype.getRandomQuote = function (correlationId, filter, callback) {
        callback = this.instrument(correlationId, 'quotes.get_random_quote', callback);
        this._db.getRandomQuote(correlationId, filter, callback);
    };
    QuotesController.prototype.getQuoteById = function (correlationId, quoteId, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quote_by_id', callback);
        this._db.getQuoteById(correlationId, quoteId, callback);
    };
    QuotesController.prototype.createQuote = function (correlationId, quote, callback) {
        callback = this.instrument(correlationId, 'quotes.create_quote', callback);
        this._db.createQuote(correlationId, quote, callback);
    };
    QuotesController.prototype.updateQuote = function (correlationId, quoteId, quote, callback) {
        callback = this.instrument(correlationId, 'quotes.update_quote', callback);
        this._db.updateQuote(correlationId, quoteId, quote, callback);
    };
    QuotesController.prototype.deleteQuote = function (correlationId, quoteId, callback) {
        callback = this.instrument(correlationId, 'quotes.delete_quote', callback);
        this._db.deleteQuote(correlationId, quoteId, callback);
    };
    /**
     * Unique descriptor for the QuotesController component
     */
    QuotesController.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Controllers, "pip-services-quotes", "*", "*");
    return QuotesController;
}(pip_services_runtime_node_3.AbstractController));
exports.QuotesController = QuotesController;
