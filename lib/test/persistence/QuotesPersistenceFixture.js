"use strict";
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var QUOTE1 = {
    id: '1',
    text: 'Text 1',
    author: 'Author 1'
};
var QUOTE2 = {
    id: '2',
    tags: ['TAG 1'],
    text: 'Text 2',
    author: 'Author 2'
};
var QUOTE3 = {
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    text: 'Text 2',
    author: 'Author 2',
    status: 'translating'
};
var QuotesPersistenceFixture = (function () {
    function QuotesPersistenceFixture(db) {
        assert.isNotNull(db);
        this._db = db;
    }
    QuotesPersistenceFixture.prototype.createQuotes = function (done) {
        var _this = this;
        async.series([
            // Create one quote
            function (callback) {
                _this._db.createQuote(null, QUOTE1, function (err, quote) {
                    assert.isNull(err);
                    assert.isObject(quote);
                    assert.equal(quote.status, 'writing');
                    assert.equal(quote.text, QUOTE1.text);
                    assert.equal(quote.author, QUOTE1.author);
                    callback();
                });
            },
            // Create another quote
            function (callback) {
                _this._db.createQuote(null, QUOTE2, function (err, quote) {
                    assert.isNull(err);
                    assert.isObject(quote);
                    assert.equal(quote.status, 'writing');
                    assert.equal(quote.text, QUOTE2.text);
                    assert.equal(quote.author, QUOTE2.author);
                    callback();
                });
            },
            // Create yet another quote
            function (callback) {
                _this._db.createQuote(null, QUOTE3, function (err, quote) {
                    assert.isNull(err);
                    assert.isObject(quote);
                    assert.equal(quote.status, QUOTE3.status);
                    assert.equal(quote.text, QUOTE3.text);
                    assert.equal(quote.author, QUOTE3.author);
                    callback();
                });
            }
        ], done);
    };
    QuotesPersistenceFixture.prototype.testCrudOperations = function (done) {
        var _this = this;
        async.series([
            // Create items
            function (callback) {
                _this.createQuotes(callback);
            },
            // Get all quotes
            function (callback) {
                _this._db.getQuotes(null, new pip_services_runtime_node_1.FilterParams(), new pip_services_runtime_node_2.PagingParams(), function (err, quotes) {
                    assert.isNull(err);
                    assert.isObject(quotes);
                    assert.lengthOf(quotes.data, 3);
                    callback();
                });
            },
            // Update the quote
            function (callback) {
                _this._db.updateQuote(null, QUOTE1.id, { text: 'Updated Content 1' }, function (err, quote) {
                    assert.isNull(err);
                    assert.isObject(quote);
                    assert.equal(quote.text, 'Updated Content 1');
                    assert.equal(quote.author, QUOTE1.author);
                    callback();
                });
            },
            // Delete quote
            function (callback) {
                _this._db.deleteQuote(null, QUOTE1.id, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete quote
            function (callback) {
                _this._db.getQuoteById(null, QUOTE1.id, function (err, quote) {
                    assert.isNull(err);
                    assert.isNull(quote || null);
                    callback();
                });
            }
        ], done);
    };
    QuotesPersistenceFixture.prototype.testGetWithFilter = function (done) {
        var _this = this;
        async.series([
            // Create quotes
            function (callback) {
                _this.createQuotes(callback);
            },
            // Get quotes filtered by tags
            function (callback) {
                _this._db.getQuotes(null, pip_services_runtime_node_1.FilterParams.fromValue({
                    tags: ['tag 1']
                }), new pip_services_runtime_node_2.PagingParams(), function (err, quotes) {
                    assert.isNull(err);
                    assert.isObject(quotes);
                    assert.lengthOf(quotes.data, 2);
                    callback();
                });
            },
            // Get quotes except certain ids
            function (callback) {
                _this._db.getQuotes(null, pip_services_runtime_node_1.FilterParams.fromValue({
                    except_ids: QUOTE1.id + ',' + QUOTE3.id
                }), new pip_services_runtime_node_2.PagingParams(), function (err, quotes) {
                    assert.isNull(err);
                    assert.isObject(quotes);
                    assert.lengthOf(quotes.data, 1);
                    callback();
                });
            },
            // Get quotes filtered by status
            function (callback) {
                _this._db.getQuotes(null, pip_services_runtime_node_1.FilterParams.fromValue({
                    status: QUOTE3.status
                }), new pip_services_runtime_node_2.PagingParams(), function (err, quotes) {
                    assert.isNull(err);
                    assert.isObject(quotes);
                    assert.lengthOf(quotes.data, 1);
                    callback();
                });
            },
        ], done);
    };
    QuotesPersistenceFixture.prototype.testGetRandom = function (done) {
        var _this = this;
        async.series([
            // Create quotes
            function (callback) {
                _this.createQuotes(callback);
            },
            // Get random quote filtered by tags
            function (callback) {
                _this._db.getRandomQuote(null, pip_services_runtime_node_1.FilterParams.fromValue({
                    tags: ['tag 1'],
                    status: 'writing'
                }), function (err, quote) {
                    assert.isNull(err);
                    assert.isObject(quote);
                    assert.equal(QUOTE2.id, quote.id);
                    callback();
                });
            }
        ], done);
    };
    return QuotesPersistenceFixture;
}());
exports.QuotesPersistenceFixture = QuotesPersistenceFixture;
