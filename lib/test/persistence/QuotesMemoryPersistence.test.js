"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var QuotesMemoryPersistence_1 = require('../../src/persistence/QuotesMemoryPersistence');
var QuotesPersistenceFixture_1 = require('./QuotesPersistenceFixture');
suite('QuotesMemoryPersistence', function () {
    var db, fixture;
    setup(function (done) {
        db = new QuotesMemoryPersistence_1.QuotesMemoryPersistence();
        db.configure(new pip_services_runtime_node_2.ComponentConfig());
        fixture = new QuotesPersistenceFixture_1.QuotesPersistenceFixture(db);
        db.link(new pip_services_runtime_node_1.ComponentSet());
        db.open(done);
    });
    teardown(function (done) {
        db.close(done);
    });
    test('CRUD Operations', function (done) {
        fixture.testCrudOperations(done);
    });
    test('Get with Filters', function (done) {
        fixture.testGetWithFilter(done);
    });
    test('Get Random', function (done) {
        fixture.testGetRandom(done);
    });
});
