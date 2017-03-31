let QuotesProcess = require('../obj/src/container/QuotesProcess').QuotesProcess;

try {
    new QuotesProcess().runWithArguments(process.argv);
} catch (ex) {
    console.error(ex);
}
