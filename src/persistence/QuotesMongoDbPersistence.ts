let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';

import { QuoteV1 } from '../data/version1/QuoteV1';
import { TagsProcessor } from '../data/TagsProcessor';
import { IQuotesPersistence } from './IQuotesPersistence';
import { QuotesMongoDbSchema } from './QuotesMongoDbSchema';

export class QuotesMongoDbPersistence extends IdentifiableMongoDbPersistence<QuoteV1, string> implements IQuotesPersistence {

    constructor() {
        super('quotes', QuotesMongoDbSchema());
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ source: { $regex: searchRegex } });
            searchCriteria.push({ type: { $regex: searchRegex } });
            searchCriteria.push({ 'text.en': { $regex: searchRegex } });
            searchCriteria.push({ 'text.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'text.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'text.de': { $regex: searchRegex } });
            searchCriteria.push({ 'text.ru': { $regex: searchRegex } });
            searchCriteria.push({ 'author.en': { $regex: searchRegex } });
            searchCriteria.push({ 'author.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'author.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'author.de': { $regex: searchRegex } });
            searchCriteria.push({ 'author.ru': { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        // Search by tags
        let tags = filter.getAsObject('tags');
        if (tags) {
            let searchTags = TagsProcessor.compressTags(tags);
            criteria.push({ all_tags: { $in: searchTags } });
        }

        let author = filter.getAsNullableString('author');
        if (author != null) {
            let authorCriteria = [];
            authorCriteria.push({ 'author.en': author });
            authorCriteria.push({ 'author.fr': author });
            authorCriteria.push({ 'author.sp': author });
            authorCriteria.push({ 'author.de': author });
            authorCriteria.push({ 'author.ru': author });
            criteria.push({ $or: authorCriteria });
        }

        let status = filter.getAsNullableString('status');
        if (status != null)
            criteria.push({ status: status });

        // Filter except ids
        let exceptIds = filter.getAsObject('except_ids');
        if (_.isString(exceptIds))
            exceptIds = exceptIds.split(',');
        if (_.isArray(exceptIds))
            criteria.push({ _id: { $nin: exceptIds } });

        return criteria.length > 0 ? { $and: criteria } : null;
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
