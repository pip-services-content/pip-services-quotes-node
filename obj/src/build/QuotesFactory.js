"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const QuotesMongoDbPersistence_1 = require("../persistence/QuotesMongoDbPersistence");
const QuotesFilePersistence_1 = require("../persistence/QuotesFilePersistence");
const QuotesMemoryPersistence_1 = require("../persistence/QuotesMemoryPersistence");
const QuotesController_1 = require("../logic/QuotesController");
const QuotesRestServiceV1_1 = require("../services/version1/QuotesRestServiceV1");
const QuotesSenecaServiceV1_1 = require("../services/version1/QuotesSenecaServiceV1");
class QuotesFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(QuotesFactory.MemoryPersistenceDescriptor, QuotesMemoryPersistence_1.QuotesMemoryPersistence);
        this.registerAsType(QuotesFactory.FilePersistenceDescriptor, QuotesFilePersistence_1.QuotesFilePersistence);
        this.registerAsType(QuotesFactory.MongoDbPersistenceDescriptor, QuotesMongoDbPersistence_1.QuotesMongoDbPersistence);
        this.registerAsType(QuotesFactory.ControllerDescriptor, QuotesController_1.QuotesController);
        this.registerAsType(QuotesFactory.SenecaServiceDescriptor, QuotesSenecaServiceV1_1.QuotesSenecaServiceV1);
        this.registerAsType(QuotesFactory.RestServiceDescriptor, QuotesRestServiceV1_1.QuotesRestServiceV1);
    }
}
QuotesFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-quotes", "factory", "default", "default", "1.0");
QuotesFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-quotes", "persistence", "memory", "*", "1.0");
QuotesFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-quotes", "persistence", "file", "*", "1.0");
QuotesFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-quotes", "persistence", "mongodb", "*", "1.0");
QuotesFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-quotes", "controller", "default", "*", "1.0");
QuotesFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-quotes", "service", "seneca", "*", "1.0");
QuotesFactory.RestServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-quotes", "service", "rest", "*", "1.0");
exports.QuotesFactory = QuotesFactory;
//# sourceMappingURL=QuotesFactory.js.map