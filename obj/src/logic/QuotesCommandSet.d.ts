import { CommandSet } from 'pip-services3-commons-node';
import { IQuotesController } from './IQuotesController';
export declare class QuotesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IQuotesController);
    private makeGetQuotesCommand();
    private makeGetRandomQuoteCommand();
    private makeGetQuoteByIdCommand();
    private makeCreateQuoteCommand();
    private makeUpdateQuoteCommand();
    private makeDeleteQuoteByIdCommand();
}
