import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';

import { QuotesMemoryPersistence } from '../../src/persistence/QuotesMemoryPersistence';
import { QuotesPersistenceFixture } from './QuotesPersistenceFixture';

suite('QuotesMemoryPersistence', ()=> {
    let db, fixture;
    
    setup((done) => {
        db = new QuotesMemoryPersistence();
        db.configure(new ComponentConfig());
        
        fixture = new QuotesPersistenceFixture(db);
        
        db.link(new ComponentSet());
        db.open(done);
    });
    
    teardown((done) => {
        db.close(done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

    test('Get Random', (done) => {
        fixture.testGetRandom(done);
    });
});