"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var QuotesFilePersistence_1 = require('./QuotesFilePersistence');
var QuotesMemoryPersistence = (function (_super) {
    __extends(QuotesMemoryPersistence, _super);
    function QuotesMemoryPersistence() {
        _super.call(this, QuotesMemoryPersistence.Descriptor);
    }
    QuotesMemoryPersistence.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config.withDefaultTuples("options.path", ""));
    };
    QuotesMemoryPersistence.prototype.save = function (callback) {
        // Skip saving data to disk
        if (callback)
            callback(null);
    };
    /**
     * Unique descriptor for the QuotesMemoryPersistence component
     */
    QuotesMemoryPersistence.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Persistence, "pip-services-quotes", "memory", "*");
    return QuotesMemoryPersistence;
}(QuotesFilePersistence_1.QuotesFilePersistence));
exports.QuotesMemoryPersistence = QuotesMemoryPersistence;
