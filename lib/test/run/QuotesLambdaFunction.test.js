"use strict";
var _ = require('lodash');
var assert = require('chai').assert;
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var QuotesLambdaFunction_1 = require('../../src/run/QuotesLambdaFunction');
var buildConfig = pip_services_runtime_node_1.MicroserviceConfig.fromValue({
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
    }
});
suite('QuotesLambdaFunction', function () {
    var lambda = new QuotesLambdaFunction_1.QuotesLambdaFunction();
    suiteSetup(function (done) {
        lambda.setConfig(buildConfig);
        lambda.start(done);
        //done();
    });
    suiteTeardown(function (done) {
        lambda.stop(done);
    });
    test('Ping', function (done) {
        lambda.getHandler()({
            cmd: 'get_quotes'
        }, {
            done: function (err, quotes) {
                assert.isNull(err);
                assert.isObject(quotes);
                done();
            }
        });
    });
});
