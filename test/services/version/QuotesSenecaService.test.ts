let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { QuotesMemoryPersistence } from '../../../src/persistence/QuotesMemoryPersistence';
import { QuotesController } from '../../../src/logic/QuotesController';
import { QuotesSenecaService } from '../../../src/services/version1/QuotesSenecaService';

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

suite('QuotesSenecaService', ()=> {        
    let db = new QuotesMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new QuotesController();
    ctrl.configure(new ComponentConfig());

    let service = new QuotesSenecaService();
    service.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, service, seneca);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        var quote1, quote2;

        async.series([
        // Create one quote
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'quotes',
                        cmd: 'create_quote',
                        quote: QUOTE1
                    },
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.author, QUOTE1.author);
                        assert.equal(quote.text, QUOTE1.text);

                        quote1 = quote;

                        callback();
                    }
                );
            },
        // Create another quote
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'quotes',
                        cmd: 'create_quote',
                        quote: QUOTE2
                    },
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.author, QUOTE2.author);
                        assert.equal(quote.text, QUOTE2.text);

                        quote2 = quote;

                        callback();
                    }
                );
            },
        // Get all quotes
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'quotes',
                        cmd: 'get_quotes' 
                    },
                    (err, quotes) => {
                        assert.isNull(err);

                        assert.isObject(quotes);
                        assert.lengthOf(quotes.data, 2);

                        callback();
                    }
                );
            },
        // Update the quote
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'quotes',
                        cmd: 'update_quote',
                        quote_id: quote1.id,
                        quote: { text: 'Updated Content 1' }
                    },
                    (err, quote) => {
                        assert.isNull(err);

                        assert.isObject(quote);
                        assert.equal(quote.text, 'Updated Content 1');
                        assert.equal(quote.author, QUOTE1.author);

                        quote1 = quote;

                        callback();
                    }
                );
            },
        // Delete quote
            (callback) => {
                seneca.getSeneca().act(
                    {
                        role: 'quotes',
                        cmd: 'delete_quote',
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
                seneca.getSeneca().act(
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