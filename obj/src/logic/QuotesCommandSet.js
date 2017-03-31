"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
class QuotesCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetQuotesCommand());
        this.addCommand(this.makeGetRandomQuoteCommand());
        this.addCommand(this.makeGetQuoteByIdCommand());
        this.addCommand(this.makeCreateQuoteCommand());
        this.addCommand(this.makeUpdateQuoteCommand());
        this.addCommand(this.makeDeleteQuoteByIdCommand());
    }
    makeGetQuotesCommand() {
        return new pip_services_commons_node_2.Command("get_quotes", null, (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getQuotes(correlationId, filter, paging, callback);
        });
    }
    makeGetRandomQuoteCommand() {
        return new pip_services_commons_node_2.Command("get_random_quote", null, (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            this._logic.getRandomQuote(correlationId, filter, callback);
        });
    }
    makeGetQuoteByIdCommand() {
        return new pip_services_commons_node_2.Command("get_quote_by_id", null, (correlationId, args, callback) => {
            let quote_id = args.getAsString("quote_id");
            this._logic.getQuoteById(correlationId, quote_id, callback);
        });
    }
    makeCreateQuoteCommand() {
        return new pip_services_commons_node_2.Command("create_quote", null, (correlationId, args, callback) => {
            let quote = args.get("quote");
            this._logic.createQuote(correlationId, quote, callback);
        });
    }
    makeUpdateQuoteCommand() {
        return new pip_services_commons_node_2.Command("update_quote", null, (correlationId, args, callback) => {
            let quote = args.get("quote");
            this._logic.updateQuote(correlationId, quote, callback);
        });
    }
    makeDeleteQuoteByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_quote_by_id", null, (correlationId, args, callback) => {
            let quoteId = args.getAsNullableString("quote_id");
            this._logic.deleteQuoteById(correlationId, quoteId, callback);
        });
    }
}
exports.QuotesCommandSet = QuotesCommandSet;
//# sourceMappingURL=QuotesCommandSet.js.map