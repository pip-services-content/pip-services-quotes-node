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
var QuotesMongoDbPersistence = (function (_super) {
    __extends(QuotesMongoDbPersistence, _super);
    function QuotesMongoDbPersistence() {
        _super.call(this, QuotesMongoDbPersistence.Descriptor, require('./QuoteModel'));
    }
    QuotesMongoDbPersistence.prototype.validateQuote = function (item) {
        return _.pick(item, 'id', 'author', 'text', 'status', 'tags');
    };
    QuotesMongoDbPersistence.prototype.defineFilterCondition = function (filter) {
        var filterCondition = _.pick(filter, 'author', 'status');
        // Search by tags
        if (filter.tags) {
            var searchTags = pip_services_runtime_node_4.TagsProcessor.compressTags(filter.tags);
            filterCondition.all_tags = { $in: searchTags };
        }
        // Filter except ids
        if (_.isString(filter.except_ids))
            filter.except_ids = filter.except_ids.split(',');
        if (_.isArray(filter.except_ids))
            filterCondition._id = { $nin: filter.except_ids };
        return filterCondition;
    };
    QuotesMongoDbPersistence.prototype.getQuotes = function (correlationId, filter, paging, callback) {
        var criteria = this.defineFilterCondition(filter);
        this.getPage(correlationId, criteria, paging, null, null, callback);
    };
    QuotesMongoDbPersistence.prototype.getRandomQuote = function (correlationId, filter, callback) {
        var criteria = this.defineFilterCondition(filter);
        this.getRandom(correlationId, criteria, callback);
    };
    QuotesMongoDbPersistence.prototype.getQuoteById = function (correlationId, quoteId, callback) {
        this.getById(correlationId, quoteId, callback);
    };
    QuotesMongoDbPersistence.prototype.createQuote = function (correlationId, quote, callback) {
        quote = this.validateQuote(quote);
        quote._id = quote.id || this.createUuid();
        quote.all_tags = pip_services_runtime_node_4.TagsProcessor.extractHashTags(quote, []);
        this.create(correlationId, quote, callback);
    };
    QuotesMongoDbPersistence.prototype.updateQuote = function (correlationId, quoteId, quote, callback) {
        var _this = this;
        quote = this.validateQuote(quote);
        this._model.findById(quoteId, function (err, item) {
            if (err || item == null) {
                callback(err, null);
                return;
            }
            _.assign(item, quote);
            item.all_tags = pip_services_runtime_node_4.TagsProcessor.extractHashTags(quote, []);
            item.save(function (err) {
                item = _this.convertItem(item);
                callback(err, item);
            });
        });
    };
    QuotesMongoDbPersistence.prototype.deleteQuote = function (correlationId, quoteId, callback) {
        this.delete(correlationId, quoteId, callback);
    };
    /**
     * Unique descriptor for the QuotesMongoDbPersistence component
     */
    QuotesMongoDbPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-quotes", "mongodb", "*");
    return QuotesMongoDbPersistence;
}(pip_services_runtime_node_3.MongoDbPersistence));
exports.QuotesMongoDbPersistence = QuotesMongoDbPersistence;
