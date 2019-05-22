"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.QuotesMongooseSchema = function (collection) {
    collection = collection || 'quotes';
    let schema = new mongoose_1.Schema({
        /* Identification */
        _id: { type: String, unique: true },
        /* Content */
        text: { type: Mixed, required: true },
        author: { type: Mixed, required: true },
        /* Editing status */
        status: { type: String, required: true, 'default': 'writing' },
        /* Search  */
        tags: { type: [String], required: false },
        all_tags: { type: [String], required: false, index: true }
    }, {
        collection: collection,
        autoIndex: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=QuotesMongooseSchema.js.map