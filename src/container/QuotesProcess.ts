import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { QuotesFactory } from '../build/QuotesFactory';

export class QuotesProcess extends ProcessContainer {

    public constructor() {
        super("quotes", "Inspirational quotes microservice");
        this._factories.add(new QuotesFactory);
    }


}
