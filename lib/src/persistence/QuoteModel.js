var mongoose = require('mongoose'), Schema = mongoose.Schema, Mixed = Schema.Types.Mixed, QuoteSchema = new Schema({
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
    collection: 'quotes',
    autoIndex: true
});
QuoteSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});
module.exports = function (connection) {
    return connection.model('Quote', QuoteSchema);
};
