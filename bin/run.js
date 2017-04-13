let QuotesProcess = require('../obj/src/container/QuotesProcess').QuotesProcess;

try {
    new QuotesProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
