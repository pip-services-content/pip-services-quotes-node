import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';

import { QuoteV1 } from '../data/version1/QuoteV1';

export interface IQuotesPersistence extends IGetter<QuoteV1, string>, IWriter<QuoteV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<QuoteV1>) => void): void;

    getOneRandom(correlationId: string, filter: FilterParams, 
        callback: (err: any, item: QuoteV1) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: QuoteV1) => void): void;

    create(correlationId: string, item: QuoteV1, 
        callback: (err: any, item: QuoteV1) => void): void;

    update(correlationId: string, item: QuoteV1, 
        callback: (err: any, item: QuoteV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: QuoteV1) => void): void;
}
