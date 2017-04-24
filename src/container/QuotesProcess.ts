import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { QuotesServiceFactory } from '../build/QuotesServiceFactory';

export class QuotesProcess extends ProcessContainer {

    public constructor() {
        super("quotes", "Inspirational quotes microservice");
        this._factories.add(new QuotesServiceFactory);
    }


}
