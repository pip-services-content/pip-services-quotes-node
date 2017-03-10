let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { SenecaService } from 'pip-services-runtime-node';

import { IQuotesBusinessLogic } from '../../logic/IQuotesBusinessLogic';

export class QuotesSenecaService extends SenecaService {       
	/**
	 * Unique descriptor for the QuotesSenecaService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-quotes", "seneca", "1.0"
	);

    private _logic: IQuotesBusinessLogic;

    constructor() {
        super(QuotesSenecaService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IQuotesBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-quotes", "*", "*")
		);

		super.link(components);		

        this.registerCommands('quotes', this._logic.getCommands());
	}

}
