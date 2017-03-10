let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { MongoDbPersistence } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { TagsProcessor } from 'pip-services-runtime-node';

import { IQuotesPersistence } from './IQuotesPersistence';

export class QuotesMongoDbPersistence extends MongoDbPersistence implements IQuotesPersistence {
	/**
	 * Unique descriptor for the QuotesMongoDbPersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-quotes", "mongodb", "*"
	);

    constructor() {
        super(QuotesMongoDbPersistence.Descriptor, require('./QuoteModel'));
    }
    
    private validateQuote(item) {
        return _.pick(item, 'id', 'author', 'text', 'status', 'tags');
    }
    
    private defineFilterCondition(filter: any) {
        let filterCondition = _.pick(filter, 'author', 'status');

        // Search by tags
        if (filter.tags) {
            let searchTags = TagsProcessor.compressTags(filter.tags);
            filterCondition.all_tags = { $in: searchTags };
        }

        // Filter except ids
        if (_.isString(filter.except_ids))
            filter.except_ids = filter.except_ids.split(',');
        if (_.isArray(filter.except_ids))
            filterCondition._id = { $nin: filter.except_ids };

        return filterCondition;
    }
    
    public getQuotes(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let criteria = this.defineFilterCondition(filter);

        this.getPage(correlationId, criteria, paging, null, null, callback);
    }

    public getRandomQuote(correlationId: string, filter: FilterParams, callback: any) {
        let criteria = this.defineFilterCondition(filter);

        this.getRandom(correlationId, criteria, callback);
    }

    public getQuoteById(correlationId: string, quoteId: string, callback: any) {
        this.getById(correlationId, quoteId, callback);
    }

    public createQuote(correlationId: string, quote: any, callback: any) {
        quote = this.validateQuote(quote);            
        quote._id = quote.id || this.createUuid();
        quote.all_tags = TagsProcessor.extractHashTags(quote, []);

        this.create(correlationId, quote, callback);
    }

    public updateQuote(correlationId: string, quoteId: string, quote: any, callback: any) {
        quote = this.validateQuote(quote);            

        this._model.findById(
            quoteId,
            (err, item) => {
                if (err || item == null) {
                    callback(err, null);
                    return;
                }
                
                _.assign(item, quote);
                item.all_tags = TagsProcessor.extractHashTags(quote, []);
                
                item.save((err) => {
                    item = this.convertItem(item);
                    callback(err, item);
                });
            }
        );
    }

    public deleteQuote(correlationId: string, quoteId: string, callback) {
        this.delete(correlationId, quoteId, callback);        
    }
}
