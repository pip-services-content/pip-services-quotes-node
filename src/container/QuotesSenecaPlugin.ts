import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-net-node';

import { QuotesMemoryPersistence } from '../persistence/QuotesMemoryPersistence';
import { QuotesFilePersistence } from '../persistence/QuotesFilePersistence';
import { QuotesMongoDbPersistence } from '../persistence/QuotesMongoDbPersistence';
import { QuotesController } from '../logic/QuotesController';
import { QuotesSenecaServiceV1 } from '../services/version1/QuotesSenecaServiceV1';

export class QuotesSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-quotes', seneca, QuotesSenecaPlugin.createReferences(options));
    }

    private static createReferences(options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let controller = new QuotesController();

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new QuotesMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new QuotesFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new QuotesMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let service = new QuotesSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        return References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-quotes', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-quotes', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-quotes', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new QuotesSenecaPlugin(seneca, options);
    return { name: plugin.name };
}