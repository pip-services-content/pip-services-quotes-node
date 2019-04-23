"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const QuotesServiceFactory_1 = require("../build/QuotesServiceFactory");
class QuotesLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("quotes", "Inspirational quotes function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-quotes', 'controller', 'default', '*', '*'));
        this._factories.add(new QuotesServiceFactory_1.QuotesServiceFactory());
    }
}
exports.QuotesLambdaFunction = QuotesLambdaFunction;
exports.handler = new QuotesLambdaFunction().getHandler();
//# sourceMappingURL=QuotesLambdaFunction.js.map