import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { QuotesServiceFactory } from '../build/QuotesServiceFactory';

export class QuotesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("quotes", "Inspirational quotes function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-quotes', 'controller', 'default', '*', '*'));
        this._factories.add(new QuotesServiceFactory());
    }
}

export const handler = new QuotesLambdaFunction().getHandler();