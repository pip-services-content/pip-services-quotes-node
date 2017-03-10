"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var QuotesMongoDbPersistence_1 = require('../persistence/QuotesMongoDbPersistence');
var QuotesFilePersistence_1 = require('../persistence/QuotesFilePersistence');
var QuotesMemoryPersistence_1 = require('../persistence/QuotesMemoryPersistence');
var QuotesController_1 = require('../logic/QuotesController');
var QuotesRestService_1 = require('../services/version1/QuotesRestService');
var QuotesSenecaService_1 = require('../services/version1/QuotesSenecaService');
var QuotesFactory = (function (_super) {
    __extends(QuotesFactory, _super);
    function QuotesFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(QuotesFilePersistence_1.QuotesFilePersistence.Descriptor, QuotesFilePersistence_1.QuotesFilePersistence);
        this.register(QuotesMemoryPersistence_1.QuotesMemoryPersistence.Descriptor, QuotesMemoryPersistence_1.QuotesMemoryPersistence);
        this.register(QuotesMongoDbPersistence_1.QuotesMongoDbPersistence.Descriptor, QuotesMongoDbPersistence_1.QuotesMongoDbPersistence);
        this.register(QuotesController_1.QuotesController.Descriptor, QuotesController_1.QuotesController);
        this.register(QuotesRestService_1.QuotesRestService.Descriptor, QuotesRestService_1.QuotesRestService);
        this.register(QuotesSenecaService_1.QuotesSenecaService.Descriptor, QuotesSenecaService_1.QuotesSenecaService);
    }
    QuotesFactory.Instance = new QuotesFactory();
    return QuotesFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.QuotesFactory = QuotesFactory;
