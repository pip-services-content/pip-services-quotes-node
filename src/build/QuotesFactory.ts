import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

import { QuotesMongoDbPersistence } from '../persistence/QuotesMongoDbPersistence';
import { QuotesFilePersistence } from '../persistence/QuotesFilePersistence';
import { QuotesMemoryPersistence } from '../persistence/QuotesMemoryPersistence';
import { QuotesController } from '../logic/QuotesController';
import { QuotesRestService } from '../services/version1/QuotesRestService';
import { QuotesSenecaService } from '../services/version1/QuotesSenecaService'; 

export class QuotesFactory extends ComponentFactory {
	public static Instance: QuotesFactory = new QuotesFactory();
	
	constructor() {
		super(DefaultFactory.Instance);

		this.register(QuotesFilePersistence.Descriptor, QuotesFilePersistence);
		this.register(QuotesMemoryPersistence.Descriptor, QuotesMemoryPersistence);
		this.register(QuotesMongoDbPersistence.Descriptor, QuotesMongoDbPersistence);
		this.register(QuotesController.Descriptor, QuotesController);
		this.register(QuotesRestService.Descriptor, QuotesRestService);
		this.register(QuotesSenecaService.Descriptor, QuotesSenecaService);
	}
	
}
