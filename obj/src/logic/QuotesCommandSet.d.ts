import { CommandSet } from 'pip-services-commons-node';
import { IQuotesBusinessLogic } from './IQuotesBusinessLogic';
export declare class QuotesCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IQuotesBusinessLogic);
    private makeGetQuotesCommand();
    private makeGetRandomQuoteCommand();
    private makeGetQuoteByIdCommand();
    private makeCreateQuoteCommand();
    private makeUpdateQuoteCommand();
    private makeDeleteQuoteByIdCommand();
}
