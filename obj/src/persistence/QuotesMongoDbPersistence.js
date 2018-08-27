"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_mongodb_node_1 = require("pip-services-mongodb-node");
const QuotesMongoDbSchema_1 = require("./QuotesMongoDbSchema");
class QuotesMongoDbPersistence extends pip_services_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('quotes', QuotesMongoDbSchema_1.QuotesMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
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
            let searchTags = pip_services_commons_node_2.TagsProcessor.compressTags([tags]);
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneRandom(correlationId, filter, callback) {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }
}
exports.QuotesMongoDbPersistence = QuotesMongoDbPersistence;
//# sourceMappingURL=QuotesMongoDbPersistence.js.map