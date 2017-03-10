import { Microservice } from 'pip-services-runtime-node';

import { QuotesFactory } from '../build/QuotesFactory';

/**
 * Quotes microservice class.
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-09
 */
export class QuotesMicroservice extends Microservice {
	/**
	 * Creates instance of quotes microservice.
	 */
	constructor() {
		super("pip-services-quotes", QuotesFactory.Instance);
	}
}
