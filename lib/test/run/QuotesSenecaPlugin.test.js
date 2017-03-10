"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var QuotesSenecaPlugin_1 = require('../../src/run/QuotesSenecaPlugin');
var buildConfig = {
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
suite('QuotesSenecaPlugin', function () {
    var seneca;
    var plugin = new QuotesSenecaPlugin_1.QuotesSenecaPlugin();
    suiteSetup(function (done) {
        seneca = require('seneca')();
        seneca.use(plugin.entry(buildConfig));
        done();
    });
    suiteTeardown(function (done) {
        seneca.close(done);
    });
    test('Ping', function (done) {
        seneca.act({
            role: 'quotes',
            cmd: 'get_quotes'
        }, function (err, quotes) {
            assert.isNull(err);
            assert.isObject(quotes);
            done();
        });
    });
});
