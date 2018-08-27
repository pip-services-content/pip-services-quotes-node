"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const QuotesMongoDbPersistence_1 = require("../persistence/QuotesMongoDbPersistence");
const QuotesFilePersistence_1 = require("../persistence/QuotesFilePersistence");
const QuotesMemoryPersistence_1 = require("../persistence/QuotesMemoryPersistence");
const QuotesController_1 = require("../logic/QuotesController");
const QuotesHttpServiceV1_1 = require("../services/version1/QuotesHttpServiceV1");
const QuotesSenecaServiceV1_1 = require("../services/version1/QuotesSenecaServiceV1");
class QuotesServiceFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(QuotesServiceFactory.MemoryPersistenceDescriptor, QuotesMemoryPersistence_1.QuotesMemoryPersistence);
        this.registerAsType(QuotesServiceFactory.FilePersistenceDescriptor, QuotesFilePersistence_1.QuotesFilePersistence);
        this.registerAsType(QuotesServiceFactory.MongoDbPersistenceDescriptor, QuotesMongoDbPersistence_1.QuotesMongoDbPersistence);
        this.registerAsType(QuotesServiceFactory.ControllerDescriptor, QuotesController_1.QuotesController);
        this.registerAsType(QuotesServiceFactory.SenecaServiceDescriptor, QuotesSenecaServiceV1_1.QuotesSenecaServiceV1);
        this.registerAsType(QuotesServiceFactory.HttpServiceDescriptor, QuotesHttpServiceV1_1.QuotesHttpServiceV1);
    }
}
QuotesServiceFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services-quotes", "factory", "default", "default", "1.0");
QuotesServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-quotes", "persistence", "memory", "*", "1.0");
QuotesServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-quotes", "persistence", "file", "*", "1.0");
QuotesServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-quotes", "persistence", "mongodb", "*", "1.0");
QuotesServiceFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-quotes", "controller", "default", "*", "1.0");
QuotesServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-quotes", "service", "seneca", "*", "1.0");
QuotesServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-quotes", "service", "http", "*", "1.0");
exports.QuotesServiceFactory = QuotesServiceFactory;
//# sourceMappingURL=QuotesServiceFactory.js.map