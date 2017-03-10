"use strict";
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var QuotesMongoDbPersistence_1 = require('../../src/persistence/QuotesMongoDbPersistence');
var QuotesPersistenceFixture_1 = require('./QuotesPersistenceFixture');
var config = pip_services_runtime_node_2.ConfigReader.read('./config/config.yaml');
var dbConfigs = config.getSection(pip_services_runtime_node_1.Category.Persistence) || [];
var dbConfig = dbConfigs.length == 1 ? dbConfigs[0] : null;
suite('QuotesMongoDbPersistence', function () {
    // Skip test if mongodb is not configured
    if (dbConfig.getRawContent().getString('descriptor.type') != 'mongodb')
        return;
    var db = new QuotesMongoDbPersistence_1.QuotesMongoDbPersistence();
    db.configure(dbConfig);
    var fixture = new QuotesPersistenceFixture_1.QuotesPersistenceFixture(db);
    suiteSetup(function (done) {
        db.link(new pip_services_runtime_node_3.ComponentSet());
        db.open(done);
    });
    suiteTeardown(function (done) {
        db.close(done);
    });
    setup(function (done) {
        db.clearTestData(done);
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
