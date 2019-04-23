import { ConfigParams } from 'pip-services3-commons-node';

import { QuotesMemoryPersistence } from '../../src/persistence/QuotesMemoryPersistence';
import { QuotesPersistenceFixture } from './QuotesPersistenceFixture';

suite('QuotesMemoryPersistence', ()=> {
    let persistence: QuotesMemoryPersistence;
    let fixture: QuotesPersistenceFixture;
    
    setup((done) => {
        persistence = new QuotesMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new QuotesPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
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