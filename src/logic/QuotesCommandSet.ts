import { CommandSet } from 'pip-services-runtime-node';
import { ICommand } from 'pip-services-runtime-node';
import { Command } from 'pip-services-runtime-node';
import { Schema } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IQuotesBusinessLogic } from './IQuotesBusinessLogic';

export class QuotesCommandSet extends CommandSet {
    private _logic: IQuotesBusinessLogic;

    constructor(logic: IQuotesBusinessLogic) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetQuotesCommand());
		this.addCommand(this.makeGetRandomQuoteCommand());
		this.addCommand(this.makeGetQuoteByIdCommand());
		this.addCommand(this.makeCreateQuoteCommand());
		this.addCommand(this.makeUpdateQuoteCommand());
		this.addCommand(this.makeDeleteQuoteCommand());
    }

	private makeGetQuotesCommand(): ICommand {
		return new Command(
			this._logic,
			"get_quotes",
			new Schema()
				.withOptionalProperty("filter", "FilterParams")
				.withOptionalProperty("paging", "PagingParams")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getQuotes(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetRandomQuoteCommand(): ICommand {
		return new Command(
			this._logic,
			"get_random_quote",
			new Schema()
				.withOptionalProperty("filter", "FilterParams"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                this._logic.getRandomQuote(correlationId, filter, callback);
            }
		);
	}

	private makeGetQuoteByIdCommand(): ICommand {
		return new Command(
			this._logic,
			"get_quote_by_id",
			new Schema()
				.withProperty("quote_id", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let quoteId = args.getNullableString("quote_id");
                this._logic.getQuoteById(correlationId, quoteId, callback);
            }
		);
	}

	private makeCreateQuoteCommand(): ICommand {
		return new Command(
			this._logic,
			"create_quote",
			new Schema()
				.withProperty("quote", "Quote"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let quote = args.get("quote");
                this._logic.createQuote(correlationId, quote, callback);
            }
		);
	}

	private makeUpdateQuoteCommand(): ICommand {
		return new Command(
			this._logic,
			"update_quote",
			new Schema()
				.withProperty("quote_id", "string")
				.withProperty("quote", "any"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let quoteId = args.getNullableString("quote_id");
                let quote = args.get("quote");
                this._logic.updateQuote(correlationId, quoteId, quote, callback);
            }
		);
	}
	
	private makeDeleteQuoteCommand(): ICommand {
		return new Command(
			this._logic,
			"delete_quote",
			new Schema()
				.withProperty("quote_id", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let quoteId = args.getNullableString("quote_id");
                this._logic.deleteQuote(correlationId, quoteId, callback);
			}
		);
	}

}