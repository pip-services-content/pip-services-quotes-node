import { IStringIdentifiable } from 'pip-services-commons-node';
import { MultiStringV1 } from './MultiStringV1';
export declare class QuoteV1 implements IStringIdentifiable {
    constructor(text: any, author: any, status?: string, tags?: string[], allTags?: string[]);
    id: string;
    text: MultiStringV1;
    author: MultiStringV1;
    status: string;
    tags: string[];
    all_tags: string[];
}
