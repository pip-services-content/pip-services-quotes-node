let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { FilePersistence } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { TagsProcessor } from 'pip-services-runtime-node';

import { IQuotesPersistence } from './IQuotesPersistence';

export class QuotesFilePersistence extends FilePersistence implements IQuotesPersistence {
	/**
	 * Unique descriptor for the QuotesFilePersistence component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Persistence, "pip-services-quotes", "file", "*"
	);
    
    constructor(descriptor?: ComponentDescriptor) {
        super(descriptor || QuotesFilePersistence.Descriptor);
    }
    
    private validateQuote(item) {
        return _.pick(item, 'id', 'author', 'text', 'status', 'tags');
    }        
    
    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private filterQuotes(filter: any) {
        filter = filter || {};
        
        let status = filter.status;
        let author = filter.author;
        let tags = filter.tags;
        let exceptIds = filter.except_ids;
        
        // Process tags filter
        if (tags) tags = TagsProcessor.compressTags(tags);
        
        // Process except ids filter
        if (_.isString(exceptIds))
            exceptIds = exceptIds.split(',');
        if (!_.isArray(exceptIds))
            exceptIds = null;
        
        return (item) => {
            if (exceptIds && _.indexOf(exceptIds, item.id) >= 0)
                return false;
            if (status && item.status != status) 
                return false;
            if (author && item.author != author) 
                return false;
            if (tags && !this.contains(item.all_tags, tags)) 
                return false;
            return true; 
        };
    }
    
    public getQuotes(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        let filterFunc = this.filterQuotes(filter);
        this.getPage(correlationId, filterFunc, paging, null, null, callback);
    }

    public getRandomQuote(correlationId: string, filter: FilterParams, callback: any) {
        let filterFunc = this.filterQuotes(filter);
        this.getRandom(correlationId, filterFunc, callback);
    }

    public getQuoteById(correlationId: string, quoteId: string, callback: any) {
        this.getById(correlationId, quoteId, callback);
    }

    public createQuote(correlationId: string, quote: any, callback: any) {
        quote = this.validateQuote(quote);

        quote.id = quote.id || this.createUuid();
        quote.status = quote.status || 'writing';
        quote.tags = quote.tags || [];
        quote.all_tags = TagsProcessor.extractHashTags(quote, []);
            
        this.create(correlationId, quote, callback);
    }

    public updateQuote(correlationId: string, quoteId: string, quote: any, callback: any) {
        quote = this.validateQuote(quote);
        quote = _.omit(quote, 'id');
        
        this.getById(correlationId, quoteId, (err, item) => {
            if (err || item == null) {
                callback(err, null);
                return;
            } 
            
            _.assign(item, quote);
            item.all_tags = TagsProcessor.extractHashTags(item, []);
            
            this.save((err) => {
                 if (err) callback(err);
                 else callback(null, item);
            });
        });
    }

    public deleteQuote(correlationId: string, quoteId: string, callback) {
        this.delete(correlationId, quoteId, callback);
    }
}
