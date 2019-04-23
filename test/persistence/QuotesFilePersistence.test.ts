import { ConfigParams } from 'pip-services3-commons-node';

import { QuotesFilePersistence } from '../../src/persistence/QuotesFilePersistence';
import { QuotesPersistenceFixture } from './QuotesPersistenceFixture';

suite('QuotesFilePersistence', ()=> {
    let persistence: QuotesFilePersistence;
    let fixture: QuotesPersistenceFixture;
    
    setup((done) => {
        persistence = new QuotesFilePersistence('./data/quotes.test.json');

        fixture = new QuotesPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
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