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
var QuotesFilePersistence = (function (_super) {
    __extends(QuotesFilePersistence, _super);
    function QuotesFilePersistence(descriptor) {
        _super.call(this, descriptor || QuotesFilePersistence.Descriptor);
    }
    QuotesFilePersistence.prototype.validateQuote = function (item) {
        return _.pick(item, 'id', 'author', 'text', 'status', 'tags');
    };
    QuotesFilePersistence.prototype.contains = function (array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (var i1 = 0; i1 < array1.length; i1++) {
            for (var i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    };
    QuotesFilePersistence.prototype.filterQuotes = function (filter) {
        var _this = this;
        filter = filter || {};
        var status = filter.status;
        var author = filter.author;
        var tags = filter.tags;
        var exceptIds = filter.except_ids;
        // Process tags filter
        if (tags)
            tags = pip_services_runtime_node_4.TagsProcessor.compressTags(tags);
        // Process except ids filter
        if (_.isString(exceptIds))
            exceptIds = exceptIds.split(',');
        if (!_.isArray(exceptIds))
            exceptIds = null;
        return function (item) {
            if (exceptIds && _.indexOf(exceptIds, item.id) >= 0)
                return false;
            if (status && item.status != status)
                return false;
            if (author && item.author != author)
                return false;
            if (tags && !_this.contains(item.all_tags, tags))
                return false;
            return true;
        };
    };
    QuotesFilePersistence.prototype.getQuotes = function (correlationId, filter, paging, callback) {
        var filterFunc = this.filterQuotes(filter);
        this.getPage(correlationId, filterFunc, paging, null, null, callback);
    };
    QuotesFilePersistence.prototype.getRandomQuote = function (correlationId, filter, callback) {
        var filterFunc = this.filterQuotes(filter);
        this.getRandom(correlationId, filterFunc, callback);
    };
    QuotesFilePersistence.prototype.getQuoteById = function (correlationId, quoteId, callback) {
        this.getById(correlationId, quoteId, callback);
    };
    QuotesFilePersistence.prototype.createQuote = function (correlationId, quote, callback) {
        quote = this.validateQuote(quote);
        quote.id = quote.id || this.createUuid();
        quote.status = quote.status || 'writing';
        quote.tags = quote.tags || [];
        quote.all_tags = pip_services_runtime_node_4.TagsProcessor.extractHashTags(quote, []);
        this.create(correlationId, quote, callback);
    };
    QuotesFilePersistence.prototype.updateQuote = function (correlationId, quoteId, quote, callback) {
        var _this = this;
        quote = this.validateQuote(quote);
        quote = _.omit(quote, 'id');
        this.getById(correlationId, quoteId, function (err, item) {
            if (err || item == null) {
                callback(err, null);
                return;
            }
            _.assign(item, quote);
            item.all_tags = pip_services_runtime_node_4.TagsProcessor.extractHashTags(item, []);
            _this.save(function (err) {
                if (err)
                    callback(err);
                else
                    callback(null, item);
            });
        });
    };
    QuotesFilePersistence.prototype.deleteQuote = function (correlationId, quoteId, callback) {
        this.delete(correlationId, quoteId, callback);
    };
    /**
     * Unique descriptor for the QuotesFilePersistence component
     */
    QuotesFilePersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-quotes", "file", "*");
    return QuotesFilePersistence;
}(pip_services_runtime_node_3.FilePersistence));
exports.QuotesFilePersistence = QuotesFilePersistence;
