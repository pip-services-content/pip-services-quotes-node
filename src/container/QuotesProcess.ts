import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { QuotesServiceFactory } from '../build/QuotesServiceFactory';

export class QuotesProcess extends ProcessContainer {

    public constructor() {
        super("quotes", "Inspirational quotes microservice");
        this._factories.add(new QuotesServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
