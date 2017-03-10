import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { QuotesFilePersistence } from '../../src/persistence/QuotesFilePersistence';
import { QuotesPersistenceFixture } from './QuotesPersistenceFixture';

let config = ComponentConfig.fromValue({
    descriptor: {
        type: 'file'
    },
    options: {
        path: './data/quotes.test.json',
        data: []
    }
});

suite('QuotesFilePersistence', ()=> {
    let db, fixture;
    
    setup((done) => {
        db = new QuotesFilePersistence();
        db.configure(config);

        fixture = new QuotesPersistenceFixture(db);
        
        db.link(new ComponentSet());
        db.open(done);
    });
    
    teardown((done) => {
        db.close(done);
    });
        
    test('CRUD Operations', (done) => {
        db.clearTestData(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

    test('Get Random', (done) => {
        fixture.testGetRandom(done);
    });
});