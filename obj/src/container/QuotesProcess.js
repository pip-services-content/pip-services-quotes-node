"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const QuotesServiceFactory_1 = require("../build/QuotesServiceFactory");
class QuotesProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("quotes", "Inspirational quotes microservice");
        this._factories.add(new QuotesServiceFactory_1.QuotesServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.QuotesProcess = QuotesProcess;
//# sourceMappingURL=QuotesProcess.js.map