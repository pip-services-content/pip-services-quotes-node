"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const QuotesFactory_1 = require("../build/QuotesFactory");
class QuotesLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("quotes", "Inspirational quotes function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-quotes', 'controller', 'default', '*', '*'));
        this._factories.add(new QuotesFactory_1.QuotesFactory());
    }
}
exports.QuotesLambdaFunction = QuotesLambdaFunction;
exports.handler = new QuotesLambdaFunction().getHandler();
//# sourceMappingURL=QuotesLambdaFunction.js.map