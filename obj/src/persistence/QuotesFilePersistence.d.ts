import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { QuotesMemoryPersistence } from './QuotesMemoryPersistence';
import { QuoteV1 } from '../data/version1/QuoteV1';
export declare class QuotesFilePersistence extends QuotesMemoryPersistence {
    protected _persister: JsonFilePersister<QuoteV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
