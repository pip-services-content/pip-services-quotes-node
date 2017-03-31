import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { QuotesFactory } from '../build/QuotesFactory';

export class QuotesProcess extends ProcessContainer {

    protected initReferences(references: IReferences): void {
        super.initReferences(references);

        // Factory to statically resolve Quotes components
        references.put(QuotesFactory.Descriptor, new QuotesFactory());
    }

    public runWithArguments(args: string[]): void {
        return this.runWithArgumentsOrConfigFile("quotes", args, "./config/config.yaml");
    }

}
