import { Category } from 'pip-services-runtime-node';
import { ConfigReader } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';

import { QuotesMongoDbPersistence } from '../../src/persistence/QuotesMongoDbPersistence';
import { QuotesPersistenceFixture } from './QuotesPersistenceFixture';

let config = ConfigReader.read('./config/config.yaml');
let dbConfigs = config.getSection(Category.Persistence) || [];
let dbConfig = dbConfigs.length == 1 ? dbConfigs[0] : null;

suite('QuotesMongoDbPersistence', ()=> {
    // Skip test if mongodb is not configured
    if (dbConfig.getRawContent().getString('descriptor.type') != 'mongodb')
        return; 
    
    let db = new QuotesMongoDbPersistence();
    db.configure(dbConfig);

    let fixture = new QuotesPersistenceFixture(db);

    suiteSetup((done) => {
        db.link(new ComponentSet());
        db.open(done);
    });
    
    suiteTeardown((done) => {
        db.close(done);
    });
    
    setup((done) => {
        db.clearTestData(done);
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