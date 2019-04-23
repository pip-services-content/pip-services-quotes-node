let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams, MultiString } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { QuoteV1 } from '../../../src/data/version1/QuoteV1';
import { QuoteStatusV1 } from '../../../src/data/version1/QuoteStatusV1';
import { QuotesMemoryPersistence } from '../../../src/persistence/QuotesMemoryPersistence';
import { QuotesController } from '../../../src/logic/QuotesController';
import { QuotesHttpServiceV1 } from '../../../src/services/version1/QuotesHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let QUOTE1: QuoteV1 = {
    id: '1',
    text: new MultiString({ en: 'Text 1' }),
    author: new MultiString({ en: 'Author 1' }),
    status: QuoteStatusV1.Completed,
    tags: null,
    all_tags: null
};
let QUOTE2: QuoteV1 = {
    id: '2',
    text: new MultiString({ en: 'Text 2' }),
    author: new MultiString({ en: 'Author 2' }),
    status: QuoteStatusV1.Completed,
    tags: ['TAG 1'],
    all_tags: null
};

suite('QuotesHttpServiceV1', ()=> {    
    let service: QuotesHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new QuotesMemoryPersistence();
        let controller = new QuotesController();

        service = new QuotesHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-quotes', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-quotes', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-quotes', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let quote1, quote2;

        async.series([
        // Create one quote
            (callback) => {
                rest.post('/v1/quotes/create_quote',
                    {
                        quote: QUOTE1
                    },
                    (err, req, res, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.author.en, QUOTE1.author.get('en'));
                        assert.equal(quote.text.en, QUOTE1.text.get('en'));

                        quote1 = quote;

                        callback();
                    }
                );
            },
        // Create another quote
            (callback) => {
                rest.post('/v1/quotes/create_quote', 
                    {
                        quote: QUOTE2
                    },
                    (err, req, res, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.author.en, QUOTE2.author.get('en'));
                        assert.equal(quote.text.en, QUOTE2.text.get('en'));

                        quote2 = quote;

                        callback();
                    }
                );
            },
        // Get all quotes
            (callback) => {
                rest.post('/v1/quotes/get_quotes',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the quote
            (callback) => {
                quote1.text = { en: 'Updated Content 1' };

                rest.post('/v1/quotes/update_quote',
                    { 
                        quote: quote1
                    },
                    (err, req, res, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.text.en, 'Updated Content 1');
                        assert.equal(quote.author.en, QUOTE1.author.get('en'));

                        quote1 = quote;

                        callback();
                    }
                );
            },
        // Delete quote
            (callback) => {
                rest.post('/v1/quotes/delete_quote_by_id',
                    {
                        quote_id: quote1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete quote
            (callback) => {
                rest.post('/v1/quotes/get_quote_by_id',
                    {
                        quote_id: quote1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});