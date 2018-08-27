import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

import { QuotesMongoDbPersistence } from '../persistence/QuotesMongoDbPersistence';
import { QuotesFilePersistence } from '../persistence/QuotesFilePersistence';
import { QuotesMemoryPersistence } from '../persistence/QuotesMemoryPersistence';
import { QuotesController } from '../logic/QuotesController';
import { QuotesHttpServiceV1 } from '../services/version1/QuotesHttpServiceV1';
import { QuotesSenecaServiceV1 } from '../services/version1/QuotesSenecaServiceV1'; 

export class QuotesServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-quotes", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-quotes", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-quotes", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-quotes", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-quotes", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-quotes", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-quotes", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(QuotesServiceFactory.MemoryPersistenceDescriptor, QuotesMemoryPersistence);
		this.registerAsType(QuotesServiceFactory.FilePersistenceDescriptor, QuotesFilePersistence);
		this.registerAsType(QuotesServiceFactory.MongoDbPersistenceDescriptor, QuotesMongoDbPersistence);
		this.registerAsType(QuotesServiceFactory.ControllerDescriptor, QuotesController);
		this.registerAsType(QuotesServiceFactory.SenecaServiceDescriptor, QuotesSenecaServiceV1);
		this.registerAsType(QuotesServiceFactory.HttpServiceDescriptor, QuotesHttpServiceV1);
	}
	
}
