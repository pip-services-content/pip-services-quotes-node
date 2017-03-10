import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { IPersistence } from 'pip-services-runtime-node';

export interface IQuotesPersistence extends IPersistence {
    getQuotes(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any);
    getRandomQuote(correlationId: string, filter: FilterParams, callback: any);
    getQuoteById(correlationId: string, quoteId: string, callback: any);
    createQuote(correlationId: string, quote: any, callback: any);
    updateQuote(correlationId: string, quoteId: string, quote: any, callback: any);
    deleteQuote(correlationId: string, quoteId: any, callback: any);
}
