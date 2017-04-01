let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { TagsProcessor } from 'pip-services-commons-node';

import { QuoteV1 } from '../data/version1/QuoteV1';
import { IQuotesPersistence } from './IQuotesPersistence';

export class QuotesMemoryPersistence 
    extends IdentifiableMemoryPersistence<QuoteV1, string> 
    implements IQuotesPersistence {

    constructor() {
        super();
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchMultilanguageString(value: any, search: string): boolean {
        for (let prop in value) {
            if (value.hasOwnProperty(prop)) {
                let text = '' + value[prop];
                if (this.matchString(text, search))
                    return true;
            }
        }
        return false;
    }

    private matchSearch(item: QuoteV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchMultilanguageString(item.text, search))
            return true;
        if (this.matchMultilanguageString(item.author, search))
            return true;
        if (this.matchString(item.status, search))
            return true;
        return false;
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
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let status = filter.getAsNullableString('status');
        let author = filter.getAsNullableString('author');
        let tags = filter.getAsObject('tags');
        let exceptIds = filter.getAsObject('except_ids');
        
        // Process tags filter
        if (tags) tags = TagsProcessor.compressTags(tags);
        
        // Process except ids filter
        if (_.isString(exceptIds))
            exceptIds = exceptIds.split(',');
        if (!_.isArray(exceptIds))
            exceptIds = null;
        
        return (item) => {
            if (search && !this.matchSearch(item, search)) 
                return false;
            if (id && item.id != id) 
                return false;
            if (exceptIds && _.indexOf(exceptIds, item.id) >= 0)
                return false;
            if (status && item.status != status) 
                return false;
            if (author && !this.matchMultilanguageString(item.author, author)) 
                return false;
            if (tags && !this.contains(item.all_tags, tags)) 
                return false;
            return true; 
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<QuoteV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public getOneRandom(correlationId: string, filter: FilterParams,
        callback: (err: any, item: QuoteV1) => void): void {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }

}
