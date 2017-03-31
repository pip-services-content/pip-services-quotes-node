import { Descriptor } from 'pip-services-commons-node';
import { CommandableRestService } from 'pip-services-net-node';

export class QuotesRestServiceV1 extends CommandableRestService {
    public constructor() {
        super('quotes');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-quotes', 'controller', 'default', '*', '1.0'));
    }
}