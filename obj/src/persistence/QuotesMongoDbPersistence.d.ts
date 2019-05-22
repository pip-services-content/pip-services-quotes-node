import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';
import { QuoteV1 } from '../data/version1/QuoteV1';
import { IQuotesPersistence } from './IQuotesPersistence';
export declare class QuotesMongoDbPersistence extends IdentifiableMongoosePersistence<QuoteV1, string> implements IQuotesPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<QuoteV1>) => void): void;
    getOneRandom(correlationId: string, filter: FilterParams, callback: (err: any, item: QuoteV1) => void): void;
}
