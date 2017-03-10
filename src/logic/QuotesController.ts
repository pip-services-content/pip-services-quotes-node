import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { AbstractController } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IQuotesPersistence } from '../persistence/IQuotesPersistence';
import { IQuotesBusinessLogic } from './IQuotesBusinessLogic';
import { QuotesCommandSet } from './QuotesCommandSet';

export class QuotesController extends AbstractController implements IQuotesBusinessLogic {
	/**
	 * Unique descriptor for the QuotesController component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Controllers, "pip-services-quotes", "*", "*"
	);
    
	private _db: IQuotesPersistence;
    
    constructor() {
        super(QuotesController.Descriptor);
    }
    
    public link(components: ComponentSet): void {
        // Locate reference to quotes persistence component
        this._db = <IQuotesPersistence>components.getOneRequired(
        	new ComponentDescriptor(Category.Persistence, "pip-services-quotes", '*', '*')
    	);
        
        super.link(components);

        // Add commands
        let commands = new QuotesCommandSet(this);
        this.addCommandSet(commands);
    }
    
    public getQuotes(correlationId: string, filter: FilterParams, paging: PagingParams, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quotes', callback);
        this._db.getQuotes(correlationId, filter, paging, callback);
    }

    public getRandomQuote(correlationId: string, filter: FilterParams, callback) {
        callback = this.instrument(correlationId, 'quotes.get_random_quote', callback);
        this._db.getRandomQuote(correlationId, filter, callback);        
    }

    public getQuoteById(correlationId: string, quoteId: string, callback) {
        callback = this.instrument(correlationId, 'quotes.get_quote_by_id', callback);
        this._db.getQuoteById(correlationId, quoteId, callback);        
    }

    public createQuote(correlationId: string, quote: any, callback) {
        callback = this.instrument(correlationId, 'quotes.create_quote', callback);
        this._db.createQuote(correlationId, quote, callback);
    }

    public updateQuote(correlationId: string, quoteId: string, quote: any, callback) {
        callback = this.instrument(correlationId, 'quotes.update_quote', callback);
        this._db.updateQuote(correlationId, quoteId, quote, callback);
    }

    public deleteQuote(correlationId: string, quoteId, callback) {
        callback = this.instrument(correlationId, 'quotes.delete_quote', callback);
        this._db.deleteQuote(correlationId, quoteId, callback);
    }
    
}
