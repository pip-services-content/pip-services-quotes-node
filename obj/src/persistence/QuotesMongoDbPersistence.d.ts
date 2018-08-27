import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-mongodb-node';
import { QuoteV1 } from '../data/version1/QuoteV1';
import { IQuotesPersistence } from './IQuotesPersistence';
export declare class QuotesMongoDbPersistence extends IdentifiableMongoDbPersistence<QuoteV1, string> implements IQuotesPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<QuoteV1>) => void): void;
    getOneRandom(correlationId: string, filter: FilterParams, callback: (err: any, item: QuoteV1) => void): void;
}
