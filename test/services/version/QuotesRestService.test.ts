let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { QuotesMemoryPersistence } from '../../../src/persistence/QuotesMemoryPersistence';
import { QuotesController } from '../../../src/logic/QuotesController';
import { QuotesRestService } from '../../../src/services/version1/QuotesRestService';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.host', 'localhost',  
    'endpoint.port', 3000
);

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

suite('QuotesRestService', ()=> {    
    let db = new QuotesMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new QuotesController();
    ctrl.configure(new ComponentConfig());

    let service = new QuotesRestService();
    service.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, service);

    let url = restConfig.getEndpoint().getUri();
    let rest = restify.createJsonClient({ url: url, version: '*' });

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('CRUD Operations', (done) => {
        let quote1, quote2;

        async.series([
        // Create one quote
            (callback) => {
                rest.post('/quotes',
                    QUOTE1,
                    (err, req, res, quote) => {
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
                rest.post('/quotes', 
                    QUOTE2,
                    (err, req, res, quote) => {
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
                rest.get('/quotes',
                    (err, req, res, quotes) => {
                        assert.isNull(err);

                        assert.isObject(quotes);
                        assert.lengthOf(quotes.data, 2);

                        callback();
                    }
                );
            },
        // Update the quote
            (callback) => {
                rest.put('/quotes/' + quote1.id,
                    { text: 'Updated Content 1' },
                    (err, req, res, quote) => {
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
                rest.del('/quotes/' + quote1.id,
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete quote
            (callback) => {
                rest.get('/quotes/' + quote1.id,
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