"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const QuotesServiceFactory_1 = require("../build/QuotesServiceFactory");
class QuotesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("quotes", "Inspirational quotes microservice");
        this._factories.add(new QuotesServiceFactory_1.QuotesServiceFactory);
    }
}
exports.QuotesProcess = QuotesProcess;
//# sourceMappingURL=QuotesProcess.js.map