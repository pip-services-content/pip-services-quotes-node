let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { QuotesFilePersistence } from './QuotesFilePersistence';
import { IQuotesPersistence } from './IQuotesPersistence';

export class QuotesMemoryPersistence extends QuotesFilePersistence implements IQuotesPersistence {
	/**
	 * Unique descriptor for the QuotesMemoryPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-quotes", "memory", "*"
	);

    constructor() {
        super(QuotesMemoryPersistence.Descriptor);
    }

    public configure(config: ComponentConfig): void {
        super.configure(config.withDefaultTuples("options.path", ""));
    }

    public save(callback: (err: any) => void): void {
        // Skip saving data to disk
        if (callback) callback(null);
    }
}