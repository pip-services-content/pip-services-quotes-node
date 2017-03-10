# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Quotes microservice

This is quotes microservice from Pip.Services library. 
It shows to users inspirational quotes on various topics.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services/pip-clients-quotes-node)
  - [Java SDK](https://github.com/pip-services/pip-clients-quotes-java)
  - [.NET SDK](https://github.com/pip-services/pip-clients-quotes-dotnet)
  - [Go SDK](https://github.com/pip-services/pip-clients-quotes-go)
* Communication Protocols
  - [HTTP/REST Version 1](doc/RestProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)
  - [Lambda Version 1](doc/LambdaProtocolV1.md)

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services/pip-services-quotes.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
logs:
    descriptor:
        type: "console" 
    options:
        level: "debug" 
counters: 
    descriptor:
        type: "log"
    options: 
        timeout: 10000 
persistence:
    descriptor:
        group: "pip-services-quotes"
        type: "file"
    options:
        path: "quotes.json"
controlers:
    descriptor:
        group: "pip-services-quotes"
services:
  - descriptor:
        group: "pip-services-quotes"
        type: "seneca"
        version: "1.0"
    endpoint:
        type: "tcp"
        host: localhost
        port: 9002
  - descriptor:            
        group: "pip-services-quotes"
        type: "rest"
        version: "1.0"
    endpoint:
        type: "http"
        host: "localhost"
        port: 8002
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-quotes-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-quotes-node').Version1;
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    endpoint: {
        protocol: 'http',
        host: 'localhost', 
        port: 80002
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.QuotesRestClient(config);

// Connect to the microservice
client.open(function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Create a new quote
var quote = {
    text: 'Get in hurry slowly',
    author: 'Russian proverb',
    tags: ['time management'],
    status: 'completed'
};

client.createQuote(
    null,
    quote,
    function (err, quote) {
        ...
    }
);
```

```javascript
// Get the list of quotes on 'time management' topic
client.getQuotes(
    null,
    {
        tags: 'time management',
        status: 'completed'
    },
    {
        total: true,
        skip: 0,
        take: 10
    },
    function(err, quotesPage) {
    ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.
