import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaFunction } from 'pip-services-runtime-node';

import { QuotesMicroservice } from '../run/QuotesMicroservice';
import { IQuotesBusinessLogic } from '../logic/IQuotesBusinessLogic';

export class QuotesLambdaFunction extends LambdaFunction {
    private _logic: IQuotesBusinessLogic;

    constructor() {
        super(new QuotesMicroservice());
    }

    public link(components: ComponentSet) {
		this._logic = <IQuotesBusinessLogic>components.getOneOptional(
			new ComponentDescriptor(Category.BusinessLogic, "pip-services-quotes", "*", "*")
		);

        super.link(components);        

        this.registerCommands(this._logic.getCommands());
    }
    
}