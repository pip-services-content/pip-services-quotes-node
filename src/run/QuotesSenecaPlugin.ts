import { SenecaPlugin } from 'pip-services-runtime-node';

import { QuotesMicroservice} from './QuotesMicroservice';

export class QuotesSenecaPlugin extends SenecaPlugin {
    constructor() {
        super('quotes', new QuotesMicroservice());
    }
}