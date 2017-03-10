"use strict";
var _ = require('lodash');
var async = require('async');
var restify = require('restify');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var QuotesMemoryPersistence_1 = require('../../../src/persistence/QuotesMemoryPersistence');
var QuotesController_1 = require('../../../src/logic/QuotesController');
var QuotesRestService_1 = require('../../../src/services/version1/QuotesRestService');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.host', 'localhost', 'endpoint.port', 3000);
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
suite('QuotesRestService', function () {
    var db = new QuotesMemoryPersistence_1.QuotesMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new QuotesController_1.QuotesController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new QuotesRestService_1.QuotesRestService();
    service.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service);
    var url = restConfig.getEndpoint().getUri();
    var rest = restify.createJsonClient({ url: url, version: '*' });
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        var quote1, quote2;
        async.series([
            // Create one quote
            function (callback) {
                rest.post('/quotes', QUOTE1, function (err, req, res, quote) {
                    assert.isNull(err);
                    assert.isObject(quote);
                    assert.equal(quote.author, QUOTE1.author);
                    assert.equal(quote.text, QUOTE1.text);
                    quote1 = quote;
                    callback();
                });
            },
            // Create another quote
            function (callback) {
                rest.post('/quotes', QUOTE2, function (err, req, res, quote) {
                    assert.isNull(err);
                    assert.isObject(quote);
                    assert.equal(quote.author, QUOTE2.author);
                    assert.equal(quote.text, QUOTE2.text);
                    quote2 = quote;
                    callback();
                });
            },
            // Get all quotes
            function (callback) {
                rest.get('/quotes', function (err, req, res, quotes) {
                    assert.isNull(err);
                    assert.isObject(quotes);
                    assert.lengthOf(quotes.data, 2);
                    callback();
                });
            },
            // Update the quote
            function (callback) {
                rest.put('/quotes/' + quote1.id, { text: 'Updated Content 1' }, function (err, req, res, quote) {
                    assert.isNull(err);
                    assert.isObject(quote);
                    assert.equal(quote.text, 'Updated Content 1');
                    assert.equal(quote.author, QUOTE1.author);
                    quote1 = quote;
                    callback();
                });
            },
            // Delete quote
            function (callback) {
                rest.del('/quotes/' + quote1.id, function (err, req, res, result) {
                    assert.isNull(err);
                    //assert.isNull(result);
                    callback();
                });
            },
            // Try to get delete quote
            function (callback) {
                rest.get('/quotes/' + quote1.id, function (err, req, res, result) {
                    assert.isNull(err);
                    console.log('!!!!' + res.statusCode);
                    //assert.isNull(result);
                    callback();
                });
            }
        ], done);
    });
});
