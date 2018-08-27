import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-seneca-node';

export class QuotesSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('quotes');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-quotes', 'controller', 'default', '*', '1.0'));
    }
}