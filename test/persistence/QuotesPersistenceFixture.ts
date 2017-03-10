let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IQuotesPersistence } from '../../src/persistence/IQuotesPersistence';

let QUOTE1 = {
    id: '1',
    text: 'Text 1',
    author: 'Author 1'
};
let QUOTE2 = {
    id: '2',
    tags: ['TAG 1'],
    text: 'Text 2',
    author: 'Author 2'
};
let QUOTE3 = {
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    text: 'Text 2',
    author: 'Author 2',
    status: 'translating'
};

export class QuotesPersistenceFixture {
    private _db: IQuotesPersistence;
    
    constructor(db) {
        assert.isNotNull(db);
        this._db = db;
    }

    createQuotes(done) {
        async.series([
        // Create one quote
            (callback) => {
                this._db.createQuote(
                    null,
                    QUOTE1,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.status, 'writing');
                        assert.equal(quote.text, QUOTE1.text);
                        assert.equal(quote.author, QUOTE1.author);

                        callback();
                    }
                );
            },
        // Create another quote
            (callback) => {
                this._db.createQuote(
                    null,
                    QUOTE2,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.status, 'writing');
                        assert.equal(quote.text, QUOTE2.text);
                        assert.equal(quote.author, QUOTE2.author);

                        callback();
                    }
                );
            },
        // Create yet another quote
            (callback) => {
                this._db.createQuote(
                    null,
                    QUOTE3,
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.status, QUOTE3.status);
                        assert.equal(quote.text, QUOTE3.text);
                        assert.equal(quote.author, QUOTE3.author);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    testCrudOperations(done) {
        async.series([
        // Create items
            (callback) => {
                this.createQuotes(callback);
            },
        // Get all quotes
            (callback) => {
                this._db.getQuotes(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, quotes) => {
                        assert.isNull(err);

                        assert.isObject(quotes);
                        assert.lengthOf(quotes.data, 3);

                        callback();
                    }
                );
            },
        // Update the quote
            (callback) => {
                this._db.updateQuote(
                    null,
                    QUOTE1.id,
                    { text: 'Updated Content 1' },
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.text, 'Updated Content 1');
                        assert.equal(quote.author, QUOTE1.author);

                        callback();
                    }
                );
            },
        // Delete quote
            (callback) => {
                this._db.deleteQuote(
                    null,
                    QUOTE1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete quote
            (callback) => {
                this._db.getQuoteById(
                    null,
                    QUOTE1.id,
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
                this.createQuotes(callback);
            },
        // Get quotes filtered by tags
            (callback) => {
                this._db.getQuotes(
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
                this._db.getQuotes(
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
                this._db.getQuotes(
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
                this.createQuotes(callback);
            },
        // Get random quote filtered by tags
            (callback) => {
                this._db.getRandomQuote(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag 1'],
                        status: 'writing'
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
