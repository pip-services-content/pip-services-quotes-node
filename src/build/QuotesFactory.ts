import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { QuotesMongoDbPersistence } from '../persistence/QuotesMongoDbPersistence';
import { QuotesFilePersistence } from '../persistence/QuotesFilePersistence';
import { QuotesMemoryPersistence } from '../persistence/QuotesMemoryPersistence';
import { QuotesController } from '../logic/QuotesController';
import { QuotesRestServiceV1 } from '../services/version1/QuotesRestServiceV1';
import { QuotesSenecaServiceV1 } from '../services/version1/QuotesSenecaServiceV1'; 

export class QuotesFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-quotes", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-quotes", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-quotes", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-quotes", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-quotes", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-quotes", "service", "seneca", "*", "1.0");
	public static RestServiceDescriptor = new Descriptor("pip-services-quotes", "service", "rest", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(QuotesFactory.MemoryPersistenceDescriptor, QuotesMemoryPersistence);
		this.registerAsType(QuotesFactory.FilePersistenceDescriptor, QuotesFilePersistence);
		this.registerAsType(QuotesFactory.MongoDbPersistenceDescriptor, QuotesMongoDbPersistence);
		this.registerAsType(QuotesFactory.ControllerDescriptor, QuotesController);
		this.registerAsType(QuotesFactory.SenecaServiceDescriptor, QuotesSenecaServiceV1);
		this.registerAsType(QuotesFactory.RestServiceDescriptor, QuotesRestServiceV1);
	}
	
}
