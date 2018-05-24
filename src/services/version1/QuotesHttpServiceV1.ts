import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class QuotesHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/quotes');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-quotes', 'controller', 'default', '*', '1.0'));
    }
}