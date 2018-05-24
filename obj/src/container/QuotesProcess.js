"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const QuotesServiceFactory_1 = require("../build/QuotesServiceFactory");
class QuotesProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("quotes", "Inspirational quotes microservice");
        this._factories.add(new QuotesServiceFactory_1.QuotesServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.QuotesProcess = QuotesProcess;
//# sourceMappingURL=QuotesProcess.js.map