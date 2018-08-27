let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { QuoteV1 } from '../../../src/data/version1/QuoteV1';
import { QuoteStatusV1 } from '../../../src/data/version1/QuoteStatusV1';
import { QuotesMemoryPersistence } from '../../../src/persistence/QuotesMemoryPersistence';
import { QuotesController } from '../../../src/logic/QuotesController';
import { QuotesSenecaServiceV1 } from '../../../src/services/version1/QuotesSenecaServiceV1';

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

suite('QuotesSenecaServiceV1', ()=> {        
    let seneca: any;
    let service: QuotesSenecaServiceV1;
    let persistence: QuotesMemoryPersistence;
    let controller: QuotesController;

    suiteSetup((done) => {
        persistence = new QuotesMemoryPersistence();
        controller = new QuotesController();

        service = new QuotesSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-quotes', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-quotes', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-quotes', 'service', 'commandable-seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var quote1, quote2;

        async.series([
        // Create one quote
            (callback) => {
                seneca.act(
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
                seneca.act(
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
                seneca.act(
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

                seneca.act(
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
                seneca.act(
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
                seneca.act(
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