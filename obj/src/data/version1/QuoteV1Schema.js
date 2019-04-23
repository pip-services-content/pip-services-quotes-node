"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
class QuoteV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('text', pip_services3_commons_node_3.TypeCode.Map);
        this.withOptionalProperty('author', pip_services3_commons_node_3.TypeCode.Map);
        this.withOptionalProperty('status', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('tags', new pip_services3_commons_node_2.ArraySchema(pip_services3_commons_node_3.TypeCode.String));
        this.withOptionalProperty('all_tags', new pip_services3_commons_node_2.ArraySchema(pip_services3_commons_node_3.TypeCode.String));
    }
}
exports.QuoteV1Schema = QuoteV1Schema;
//# sourceMappingURL=QuoteV1Schema.js.map