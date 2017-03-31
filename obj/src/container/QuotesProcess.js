"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const QuotesFactory_1 = require("../build/QuotesFactory");
class QuotesProcess extends pip_services_container_node_1.ProcessContainer {
    initReferences(references) {
        super.initReferences(references);
        // Factory to statically resolve Quotes components
        references.put(QuotesFactory_1.QuotesFactory.Descriptor, new QuotesFactory_1.QuotesFactory());
    }
    runWithArguments(args) {
        return this.runWithArgumentsOrConfigFile("quotes", args, "./config/config.yaml");
    }
}
exports.QuotesProcess = QuotesProcess;
//# sourceMappingURL=QuotesProcess.js.map