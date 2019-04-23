import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class QuoteV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('text', TypeCode.Map);
        this.withOptionalProperty('author', TypeCode.Map);
        this.withOptionalProperty('status', TypeCode.String);
        this.withOptionalProperty('tags', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('all_tags', new ArraySchema(TypeCode.String));
    }
}
