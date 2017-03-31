"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const QuoteStatusV1_1 = require("./QuoteStatusV1");
class QuoteV1 {
    constructor(text, author, status, tags, allTags) {
        this.id = pip_services_commons_node_1.IdGenerator.nextLong();
        this.text = _.isString(text) ? { en: text } : text;
        this.author = _.isString(author) ? { en: author } : author;
        this.status = status || QuoteStatusV1_1.QuoteStatusV1.New;
        this.tags = tags || [];
        this.all_tags = allTags || [];
    }
}
exports.QuoteV1 = QuoteV1;
//# sourceMappingURL=QuoteV1.js.map