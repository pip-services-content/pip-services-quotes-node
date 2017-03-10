"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var QuotesMemoryPersistence_1 = require('../../../src/persistence/QuotesMemoryPersistence');
var QuotesController_1 = require('../../../src/logic/QuotesController');
var QuotesSenecaService_1 = require('../../../src/services/version1/QuotesSenecaService');
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
suite('QuotesSenecaService', function () {
    var db = new QuotesMemoryPersistence_1.QuotesMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new QuotesController_1.QuotesController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new QuotesSenecaService_1.QuotesSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_3.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, service, seneca);
    suiteSetup(function (done) {
        pip_services_runtime_node_4.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_4.LifeCycleManager.close(components, done);
        });
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('CRUD Operations', function (done) {
        var quote1, quote2;
        async.series([
            // Create one quote
            function (callback) {
                seneca.getSeneca().act({
                    role: 'quotes',
                    cmd: 'create_quote',
                    quote: QUOTE1
                }, function (err, quote) {
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
                seneca.getSeneca().act({
                    role: 'quotes',
                    cmd: 'create_quote',
                    quote: QUOTE2
                }, function (err, quote) {
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
                seneca.getSeneca().act({
                    role: 'quotes',
                    cmd: 'get_quotes'
                }, function (err, quotes) {
                    assert.isNull(err);
                    assert.isObject(quotes);
                    assert.lengthOf(quotes.data, 2);
                    callback();
                });
            },
            // Update the quote
            function (callback) {
                seneca.getSeneca().act({
                    role: 'quotes',
                    cmd: 'update_quote',
                    quote_id: quote1.id,
                    quote: { text: 'Updated Content 1' }
                }, function (err, quote) {
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
                seneca.getSeneca().act({
                    role: 'quotes',
                    cmd: 'delete_quote',
                    quote_id: quote1.id
                }, function (err) {
                    assert.isNull(err);
                    callback();
                });
            },
            // Try to get delete quote
            function (callback) {
                seneca.getSeneca().act({
                    role: 'quotes',
                    cmd: 'get_quote_by_id',
                    quote_id: quote1.id
                }, function (err, quote) {
                    assert.isNull(err);
                    assert.isNull(quote || null);
                    callback();
                });
            }
        ], done);
    });
});
