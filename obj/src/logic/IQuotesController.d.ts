import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { QuoteV1 } from '../data/version1/QuoteV1';
export interface IQuotesController {
    getQuotes(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<QuoteV1>) => void): void;
    getRandomQuote(correlationId: string, filter: FilterParams, callback: (err: any, quote: QuoteV1) => void): void;
    getQuoteById(correlationId: string, quote_id: string, callback: (err: any, quote: QuoteV1) => void): void;
    createQuote(correlationId: string, quote: QuoteV1, callback: (err: any, quote: QuoteV1) => void): void;
    updateQuote(correlationId: string, quote: QuoteV1, callback: (err: any, quote: QuoteV1) => void): void;
    deleteQuoteById(correlationId: string, quote_id: string, callback: (err: any, quote: QuoteV1) => void): void;
}
