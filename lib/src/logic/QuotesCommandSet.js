"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var QuotesCommandSet = (function (_super) {
    __extends(QuotesCommandSet, _super);
    function QuotesCommandSet(logic) {
        _super.call(this);
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetQuotesCommand());
        this.addCommand(this.makeGetRandomQuoteCommand());
        this.addCommand(this.makeGetQuoteByIdCommand());
        this.addCommand(this.makeCreateQuoteCommand());
        this.addCommand(this.makeUpdateQuoteCommand());
        this.addCommand(this.makeDeleteQuoteCommand());
    }
    QuotesCommandSet.prototype.makeGetQuotesCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_quotes", new pip_services_runtime_node_3.Schema()
            .withOptionalProperty("filter", "FilterParams")
            .withOptionalProperty("paging", "PagingParams"), function (correlationId, args, callback) {
            var filter = pip_services_runtime_node_4.FilterParams.fromValue(args.get("filter"));
            var paging = pip_services_runtime_node_5.PagingParams.fromValue(args.get("paging"));
            _this._logic.getQuotes(correlationId, filter, paging, callback);
        });
    };
    QuotesCommandSet.prototype.makeGetRandomQuoteCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_random_quote", new pip_services_runtime_node_3.Schema()
            .withOptionalProperty("filter", "FilterParams"), function (correlationId, args, callback) {
            var filter = pip_services_runtime_node_4.FilterParams.fromValue(args.get("filter"));
            _this._logic.getRandomQuote(correlationId, filter, callback);
        });
    };
    QuotesCommandSet.prototype.makeGetQuoteByIdCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "get_quote_by_id", new pip_services_runtime_node_3.Schema()
            .withProperty("quote_id", "string"), function (correlationId, args, callback) {
            var quoteId = args.getNullableString("quote_id");
            _this._logic.getQuoteById(correlationId, quoteId, callback);
        });
    };
    QuotesCommandSet.prototype.makeCreateQuoteCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "create_quote", new pip_services_runtime_node_3.Schema()
            .withProperty("quote", "Quote"), function (correlationId, args, callback) {
            var quote = args.get("quote");
            _this._logic.createQuote(correlationId, quote, callback);
        });
    };
    QuotesCommandSet.prototype.makeUpdateQuoteCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "update_quote", new pip_services_runtime_node_3.Schema()
            .withProperty("quote_id", "string")
            .withProperty("quote", "any"), function (correlationId, args, callback) {
            var quoteId = args.getNullableString("quote_id");
            var quote = args.get("quote");
            _this._logic.updateQuote(correlationId, quoteId, quote, callback);
        });
    };
    QuotesCommandSet.prototype.makeDeleteQuoteCommand = function () {
        var _this = this;
        return new pip_services_runtime_node_2.Command(this._logic, "delete_quote", new pip_services_runtime_node_3.Schema()
            .withProperty("quote_id", "string"), function (correlationId, args, callback) {
            var quoteId = args.getNullableString("quote_id");
            _this._logic.deleteQuote(correlationId, quoteId, callback);
        });
    };
    return QuotesCommandSet;
}(pip_services_runtime_node_1.CommandSet));
exports.QuotesCommandSet = QuotesCommandSet;
