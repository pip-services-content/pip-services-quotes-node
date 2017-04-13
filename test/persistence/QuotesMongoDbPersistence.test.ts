import { YamlConfigReader } from 'pip-services-commons-node';

import { QuotesMongoDbPersistence } from '../../src/persistence/QuotesMongoDbPersistence';
import { QuotesPersistenceFixture } from './QuotesPersistenceFixture';

suite('QuotesMongoDbPersistence', ()=> {
    let persistence: QuotesMongoDbPersistence;
    let fixture: QuotesPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new QuotesMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new QuotesPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
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