let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { QuoteV1 } from '../../src/data/version1/QuoteV1';
import { QuoteStatusV1 } from '../../src/data/version1/QuoteStatusV1';

import { IQuotesPersistence } from '../../src/persistence/IQuotesPersistence';

let QUOTE1: QuoteV1 = {
    id: '1',
    text: { en: 'Text 1' },
    author: { en: 'Author 1' },
    status: QuoteStatusV1.Completed,
    tags: [],
    all_tags: []
};
let QUOTE2: QuoteV1 = {
    id: '2',
    text: { en: 'Text 2' },
    author: { en: 'Author 2' },
    status: QuoteStatusV1.Completed,
    tags: ['TAG 1'],
    all_tags: ['tag1']
};
let QUOTE3: QuoteV1 = {
    id: '3',
    text: { en: 'Text 2' },
    author: { en: 'Author 2' },
    status: QuoteStatusV1.Translating,
    tags: ['Tag 1', 'tag 2'],
    all_tags: ['tag1', 'tag2']
};

export class QuotesPersistenceFixture {
    private _persistence: IQuotesPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateQuotes(done) {
        async.series([
        // Create one quote
            (callback) => {
                this._persistence.create(
                    null,
                    QUOTE1,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.status, QUOTE1.status);
                        assert.equal(quote.text.en, QUOTE1.text.en);
                        assert.equal(quote.author.en, QUOTE1.author.en);

                        callback();
                    }
                );
            },
        // Create another quote
            (callback) => {
                this._persistence.create(
                    null,
                    QUOTE2,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.status, QUOTE2.status);
                        assert.equal(quote.text.en, QUOTE2.text.en);
                        assert.equal(quote.author.en, QUOTE2.author.en);

                        callback();
                    }
                );
            },
        // Create yet another quote
            (callback) => {
                this._persistence.create(
                    null,
                    QUOTE3,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.status, QUOTE3.status);
                        assert.equal(quote.text.en, QUOTE3.text.en);
                        assert.equal(quote.author.en, QUOTE3.author.en);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    testCrudOperations(done) {
        let quote1: QuoteV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateQuotes(callback);
            },
        // Get all quotes
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        quote1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the quote
            (callback) => {
                quote1.text.en = 'Updated Content 1';

                this._persistence.update(
                    null,
                    quote1,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.text.en, 'Updated Content 1');
                        assert.equal(quote.id, quote1.id);

                        callback();
                    }
                );
            },
        // Delete quote
            (callback) => {
                this._persistence.deleteById(
                    null,
                    quote1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete quote
            (callback) => {
                this._persistence.getOneById(
                    null,
                    quote1.id,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isNull(quote || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetWithFilter(done) {
        async.series([
        // Create quotes
            (callback) => {
                this.testCreateQuotes(callback);
            },
        // Get quotes filtered by tags
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag 1']
                    }),
                    new PagingParams(),
                    (err, quotes) => {
                        assert.isNull(err);

                        assert.isObject(quotes);
                        assert.lengthOf(quotes.data, 2);

                        callback();
                    }
                );
            },
        // Get quotes except certain ids
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        except_ids: QUOTE1.id + ',' + QUOTE3.id
                    }),
                    new PagingParams(),
                    (err, quotes) => {
                        assert.isNull(err);

                        assert.isObject(quotes);
                        assert.lengthOf(quotes.data, 1);

                        callback();
                    }
                );
            },
        // Get quotes filtered by status
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        status: QUOTE3.status
                    }),
                    new PagingParams(),
                    (err, quotes) => {
                        assert.isNull(err);

                        assert.isObject(quotes);
                        assert.lengthOf(quotes.data, 1);

                        callback();
                    }
                );
            },
        ], done);
    }

    testGetRandom(done) {
        async.series([
        // Create quotes
            (callback) => {
                this.testCreateQuotes(callback);
            },
        // Get random quote filtered by tags
            (callback) => {
                this._persistence.getOneRandom(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag 1'],
                        status: QuoteStatusV1.Completed
                    }),
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(QUOTE2.id, quote.id);

                        callback();
                    }
                );
            }
        ], done);
    }
}
