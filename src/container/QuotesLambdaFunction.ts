import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { QuotesFactory } from '../build/QuotesFactory';

export class QuotesLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("quotes", "Inspirational quotes function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-quotes', 'controller', 'default', '*', '*'));
        this._factories.add(new QuotesFactory());
    }
}

export const handler = new QuotesLambdaFunction().getHandler();