let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { RestService } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IQuotesBusinessLogic } from '../../logic/IQuotesBusinessLogic';

export class QuotesRestService extends RestService {       
	/**
	 * Unique descriptor for the QuotesRestService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-quotes", "rest", "1.0"
	);
    
	private _logic: IQuotesBusinessLogic;

    constructor() {
        super(QuotesRestService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IQuotesBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-quotes", "*", "*")
		);

		super.link(components);		
	}
    
    private getQuotes(req, res) {
        this._logic.getQuotes(
            req.params.correlation_id,
            new FilterParams(req.params),
            new PagingParams(req.params),
            this.sendResult(req, res)
        );
    }

    private getRandomQuote(req, res) {
        this._logic.getRandomQuote(
            req.params.correlation_id,
            new FilterParams(req.params),
            this.sendResult(req, res)
        );
    }

    private getQuoteById(req, res) {
        this._logic.getQuoteById(
            req.params.correlation_id,
            req.params.quoteId,
            this.sendResult(req, res)
        );
    }

    private createQuote(req, res) {
        this._logic.createQuote(
            req.params.correlation_id,
            req.body,
            this.sendCreatedResult(req, res)
        );
    }

    private updateQuote(req, res) {
        this._logic.updateQuote(
            req.params.correlation_id,
            req.params.quoteId,
            req.body,
            this.sendResult(req, res)
        );
    }

    private deleteQuote(req, res) {
        this._logic.deleteQuote(
            req.params.correlation_id,
            req.params.quoteId,
            this.sendDeletedResult(req, res)
        );
    }    
        
    protected register() {
        this.registerRoute('get', '/quotes', this.getQuotes);
        this.registerRoute('get', '/quotes/random', this.getRandomQuote);
        this.registerRoute('get', '/quotes/:quoteId', this.getQuoteById);
        this.registerRoute('post', '/quotes', this.createQuote);
        this.registerRoute('put', '/quotes/:quoteId', this.updateQuote);
        this.registerRoute('delete', '/quotes/:quoteId', this.deleteQuote);
    }
}
