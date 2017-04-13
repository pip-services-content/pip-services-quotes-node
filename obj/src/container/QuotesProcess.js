"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const QuotesFactory_1 = require("../build/QuotesFactory");
class QuotesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("quotes", "Inspirational quotes microservice");
        this._factories.add(new QuotesFactory_1.QuotesFactory);
    }
}
exports.QuotesProcess = QuotesProcess;
//# sourceMappingURL=QuotesProcess.js.map