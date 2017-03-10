"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var QuotesFilePersistence_1 = require('../../src/persistence/QuotesFilePersistence');
var QuotesPersistenceFixture_1 = require('./QuotesPersistenceFixture');
var config = pip_services_runtime_node_2.ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/quotes.test.json',
        data: []
    }
});
suite('QuotesFilePersistence', function () {
    var db, fixture;
    setup(function (done) {
        db = new QuotesFilePersistence_1.QuotesFilePersistence();
        db.configure(config);
        fixture = new QuotesPersistenceFixture_1.QuotesPersistenceFixture(db);
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    teardown(function (done) {
        db.close(done);
    });
    test('CRUD Operations', function (done) {
        db.clearTestData(done);
    });
    test('Get with Filters', function (done) {
        fixture.testGetWithFilter(done);
    });
    test('Get Random', function (done) {
        fixture.testGetRandom(done);
    });
});
