"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const QuotesMemoryPersistence_1 = require("../persistence/QuotesMemoryPersistence");
const QuotesFilePersistence_1 = require("../persistence/QuotesFilePersistence");
const QuotesMongoDbPersistence_1 = require("../persistence/QuotesMongoDbPersistence");
const QuotesController_1 = require("../logic/QuotesController");
const QuotesSenecaServiceV1_1 = require("../services/version1/QuotesSenecaServiceV1");
class QuotesSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-quotes', seneca, QuotesSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new QuotesController_1.QuotesController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new QuotesMongoDbPersistence_1.QuotesMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new QuotesFilePersistence_1.QuotesFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new QuotesMemoryPersistence_1.QuotesMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new QuotesSenecaServiceV1_1.QuotesSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-quotes', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-quotes', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-quotes', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.QuotesSenecaPlugin = QuotesSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new QuotesSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=QuotesSenecaPlugin.js.map