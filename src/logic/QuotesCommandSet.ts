import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { QuoteV1 } from '../data/version1/QuoteV1';
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
		this.addCommand(this.makeDeleteQuoteByIdCommand());
    }

	private makeGetQuotesCommand(): ICommand {
		return new Command(
			"get_quotes",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getQuotes(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetRandomQuoteCommand(): ICommand {
		return new Command(
			"get_random_quote",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                this._logic.getRandomQuote(correlationId, filter, callback);
            }
		);
	}

	private makeGetQuoteByIdCommand(): ICommand {
		return new Command(
			"get_quote_by_id",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let quote_id = args.getAsString("quote_id");
                this._logic.getQuoteById(correlationId, quote_id, callback);
            }
		);
	}

	private makeCreateQuoteCommand(): ICommand {
		return new Command(
			"create_quote",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let quote = args.get("quote");
                this._logic.createQuote(correlationId, quote, callback);
            }
		);
	}

	private makeUpdateQuoteCommand(): ICommand {
		return new Command(
			"update_quote",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let quote = args.get("quote");
                this._logic.updateQuote(correlationId, quote, callback);
            }
		);
	}
	
	private makeDeleteQuoteByIdCommand(): ICommand {
		return new Command(
			"delete_quote_by_id",
			null,
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let quoteId = args.getAsNullableString("quote_id");
                this._logic.deleteQuoteById(correlationId, quoteId, callback);
			}
		);
	}

}