import { ProcessRunner } from 'pip-services-runtime-node';

import { QuotesMicroservice } from './QuotesMicroservice';

/**
 * Quotes process runner
 * 
 * @author Sergey Seroukhov
 * @version 1.1
 * @since 2016-06-06
 */
export class QuotesProcessRunner extends ProcessRunner {
    /**
     * Creates instance of quotes process runner
     */
    constructor() {
        super(new QuotesMicroservice());
    }
}