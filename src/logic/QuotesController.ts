import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';

import { QuoteV1 } from '../data/version1/QuoteV1';
import { QuoteStatusV1 } from '../data/version1/QuoteStatusV1';
import { IQuotesPersistence } from '../persistence/IQuotesPersistence';
import { IQuotesBusinessLogic } from './IQuotesBusinessLogic';
import { QuotesCommandSet } from './QuotesCommandSet';

import { TagsProcessor } from '../data/TagsProcessor';

export class QuotesController implements  IConfigurable, IReferenceable, ICommandable, IQuotesBusinessLogic {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-quotes:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(QuotesController._defaultConfig);
    private _persistence: IQuotesPersistence;
    private _commandSet: QuotesCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IQuotesPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new QuotesCommandSet(this);
        return this._commandSet;
    }
    
    public getQuotes(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<QuoteV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getRandomQuote(correlationId: string, filter: FilterParams, 
        callback: (err: any, quote: QuoteV1) => void): void {
        this._persistence.getOneRandom(correlationId, filter, callback);        
    }

    public getQuoteById(correlationId: string, id: string, 
        callback: (err: any, quote: QuoteV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);        
    }

    public createQuote(correlationId: string, quote: QuoteV1, 
        callback: (err: any, quote: QuoteV1) => void): void {

        quote.status = quote.status || QuoteStatusV1.New;
        quote.tags = quote.tags || [];
        quote.all_tags = TagsProcessor.extractHashTags(quote, 'text', 'author');

        this._persistence.create(correlationId, quote, callback);
    }

    public updateQuote(correlationId: string, quote: QuoteV1, 
        callback: (err: any, quote: QuoteV1) => void): void {

        quote.status = quote.status || QuoteStatusV1.New;
        quote.tags = quote.tags || [];
        quote.all_tags = TagsProcessor.extractHashTags(quote, 'text', 'author');

        this._persistence.update(correlationId, quote, callback);
    }

    public deleteQuoteById(correlationId: string, id: string,
        callback: (err: any, quote: QuoteV1) => void): void {  
        this._persistence.deleteById(correlationId, id, callback);
    }

}
