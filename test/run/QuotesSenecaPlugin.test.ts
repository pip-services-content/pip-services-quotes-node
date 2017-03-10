let _ = require('lodash');
let assert = require('chai').assert;

import { QuotesSenecaPlugin } from '../../src/run/QuotesSenecaPlugin';

let buildConfig = {
    logs: {
        descriptor: {
            type: 'console'
        }
    },
    persistence: {
        descriptor: {
            type: 'memory'
        }
    },
    controllers: {
        descriptor: {
            type: '*'
        }
    },
    services: {
        descriptor: {
            type: 'seneca'
        }
    }
};

suite('QuotesSenecaPlugin', ()=> {    
    let seneca;
    let plugin = new QuotesSenecaPlugin();

    suiteSetup((done) => {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    
    suiteTeardown((done) => {
        seneca.close(done);
    });
                
    test('Ping', (done) => {
        seneca.act(
            {
                role: 'quotes',
                cmd: 'get_quotes' 
            },
            (err, quotes) => {
                assert.isNull(err);
                assert.isObject(quotes);

                done();
            }
        );
    });
});