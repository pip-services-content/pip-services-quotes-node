"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const QuoteStatusV1_1 = require("../data/version1/QuoteStatusV1");
const QuotesCommandSet_1 = require("./QuotesCommandSet");
class QuotesController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(QuotesController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new QuotesCommandSet_1.QuotesCommandSet(this);
        return this._commandSet;
    }
    getQuotes(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getRandomQuote(correlationId, filter, callback) {
        this._persistence.getOneRandom(correlationId, filter, callback);
    }
    getQuoteById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    createQuote(correlationId, quote, callback) {
        quote.status = quote.status || QuoteStatusV1_1.QuoteStatusV1.New;
        quote.tags = quote.tags || [];
        quote.all_tags = pip_services_commons_node_3.TagsProcessor.extractHashTags("#text#author");
        this._persistence.create(correlationId, quote, callback);
    }
    updateQuote(correlationId, quote, callback) {
        quote.status = quote.status || QuoteStatusV1_1.QuoteStatusV1.New;
        quote.tags = quote.tags || [];
        quote.all_tags = pip_services_commons_node_3.TagsProcessor.extractHashTags("#text#author");
        this._persistence.update(correlationId, quote, callback);
    }
    deleteQuoteById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
QuotesController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-quotes:persistence:*:*:1.0');
exports.QuotesController = QuotesController;
//# sourceMappingURL=QuotesController.js.map