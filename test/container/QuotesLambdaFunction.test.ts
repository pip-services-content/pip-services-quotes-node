let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { QuoteV1 } from '../../src/data/version1/QuoteV1';
import { QuoteStatusV1 } from '../../src/data/version1/QuoteStatusV1';
import { QuotesMemoryPersistence } from '../../src/persistence/QuotesMemoryPersistence';
import { QuotesController } from '../../src/logic/QuotesController';
import { QuotesLambdaFunction } from '../../src/container/QuotesLambdaFunction';

let QUOTE1: QuoteV1 = {
    id: '1',
    text: { en: 'Text 1' },
    author: { en: 'Author 1' },
    status: QuoteStatusV1.Completed,
    tags: null,
    all_tags: null
};
let QUOTE2: QuoteV1 = {
    id: '2',
    text: { en: 'Text 2' },
    author: { en: 'Author 2' },
    status: QuoteStatusV1.Completed,
    tags: ['TAG 1'],
    all_tags: null
};

suite('QuotesLambdaFunction', ()=> {
    let lambda: QuotesLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-quotes:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-quotes:controller:default:default:1.0'
        );

        lambda = new QuotesLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var quote1, quote2;

        async.series([
        // Create one quote
            (callback) => {
                lambda.act(
                    {
                        role: 'quotes',
                        cmd: 'create_quote',
                        quote: QUOTE1
                    },
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.author.en, QUOTE1.author.en);
                        assert.equal(quote.text.en, QUOTE1.text.en);

                        quote1 = quote;

                        callback();
                    }
                );
            },
        // Create another quote
            (callback) => {
                lambda.act(
                    {
                        role: 'quotes',
                        cmd: 'create_quote',
                        quote: QUOTE2
                    },
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.author.en, QUOTE2.author.en);
                        assert.equal(quote.text.en, QUOTE2.text.en);

                        quote2 = quote;

                        callback();
                    }
                );
            },
        // Get all quotes
            (callback) => {
                lambda.act(
                    {
                        role: 'quotes',
                        cmd: 'get_quotes' 
                    },
                    (err, page) => {
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

                lambda.act(
                    {
                        role: 'quotes',
                        cmd: 'update_quote',
                        quote: quote1
                    },
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.text.en, 'Updated Content 1');
                        assert.equal(quote.author.en, QUOTE1.author.en);

                        quote1 = quote;

                        callback();
                    }
                );
            },
        // Delete quote
            (callback) => {
                lambda.act(
                    {
                        role: 'quotes',
                        cmd: 'delete_quote_by_id',
                        quote_id: quote1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete quote
            (callback) => {
                lambda.act(
                    {
                        role: 'quotes',
                        cmd: 'get_quote_by_id',
                        quote_id: quote1.id
                    },
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isNull(quote || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});