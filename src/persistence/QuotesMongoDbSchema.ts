import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let QuotesMongoDbSchema = function(collection?: string) {
    collection = collection || 'quotes';

    let schema = new Schema(
        {
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
        },
        {
            collection: 'quotes',
            autoIndex: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}
