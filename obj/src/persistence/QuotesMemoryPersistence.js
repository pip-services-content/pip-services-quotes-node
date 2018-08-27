"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class QuotesMemoryPersistence extends pip_services_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchMultilanguageString(value, search) {
        for (let prop in value) {
            if (value.hasOwnProperty(prop)) {
                let text = '' + value[prop];
                if (this.matchString(text, search))
                    return true;
            }
        }
        return false;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchMultilanguageString(item.text, search))
            return true;
        if (this.matchMultilanguageString(item.author, search))
            return true;
        if (this.matchString(item.status, search))
            return true;
        return false;
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let status = filter.getAsNullableString('status');
        let author = filter.getAsNullableString('author');
        let tags = filter.getAsObject('tags');
        let exceptIds = filter.getAsObject('except_ids');
        // Process tags filter
        if (tags)
            tags = pip_services_commons_node_2.TagsProcessor.compressTags([tags]);
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneRandom(correlationId, filter, callback) {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }
}
exports.QuotesMemoryPersistence = QuotesMemoryPersistence;
//# sourceMappingURL=QuotesMemoryPersistence.js.map