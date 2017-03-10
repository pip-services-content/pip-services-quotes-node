# AWS Lambda Protocol (version 1) <br/> Quotes Microservice

Pip.Services Template microservice implements AWS Lambda compatible API. 

The entire microservice is wrapped into a single lambda function.
Selection of specific operation is done via special **cmd** parameter.
The rest parameters are passed to the operation.

The input and output parameters shall be serialized as JSON string.

The protocol is identical to the one used by [Seneca](./SenecaProtocolV1.md)   

First get reference to AWS SDK, set connection parameters and get reference to Lambda:

```javascript
var aws = require('aws-sdk')();

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region
});

var lambda = new aws.Lambda();
```

Then you can start calling Lambda function:

```javascript
var params = {
    cmd: ...operation name...,
    ... the rest params ...
};

lambda.invoke(
    {
        FunctionName: arn,
        InvocationType: 'RequestResponse',
        LogType: 'None',
        Payload: JSON.stringify(params)
    },
    function (err, response) {
        if (err) ...
        var result = JSON.parse(response.Payload);
        ...
    }
);
```

* [MultiString class](#class1)
* [Quote class](#class2)
* [QuotePage class](#class3)
* [cmd: 'get_quotes'](#operation1)
* [cmd: 'get_random_quote'](#operation2)
* [cmd: 'get_quote_by_id'](#operation3)
* [cmd: 'create_quote'](#operation4)
* [cmd: 'update_quote'](#operation5)
* [cmd: 'delete_quote'](#operation6)

## Data types

### <a name="class1"></a> MultiString class

String that contains versions in multiple languages

**Properties:**
- en: string - English version of the string
- sp: string - Spanish version of the string
- de: string - German version of the string
- fr: string - Franch version of the string
- pt: string - Portuguese version of the string
- ru: string - Russian version of the string
- .. - other languages can be added here

### <a name="class2"></a> Quote class

Represents an inspirational quote

**Properties:**
- id: string - unique quote id
- text: MultiString - quote text in different languages
- author: MultiString - name of the quote author in different languages
- status: string - editing status of the quote: 'new', 'writing', 'translating', 'completed' (default: 'new')
- tags: [string] - (optional) search tags that represent topics associated with the quote
- all_tags: [string] - (read only) explicit and hash tags in normalized format for searching  

### <a name="class3"></a> QuotePage class

Represents a paged result with subset of requested quotes

**Properties:**
- data: [Quote] - array of retrieved Quote page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Cmd: 'get_quotes'

Retrieves a collection of quotes according to specified criteria

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- filter: object - filter parameters
  - tags: [string] - (optional) list tags with topic names
  - status: string - (optional) quote editing status
  - author: string - (optional) author name in any language 
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: [Quote] or QuotePage - retrieved quotes in plain array or page format

### <a name="operation2"></a> Cmd: 'get\_random\_quote'

Retrieves a random quote from filtered resultset

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- filter: object - filter parameters
  - tags: [string] - (optional) list tags with topic names
  - status: string - (optional) quote editing status
  - author: string - (optional) author name in any language 

**Returns:**
- err: Error - occured error or null for success
- result: Quote - retrieved random quote, null if object wasn't found 

### <a name="operation3"></a> Cmd: 'get\_quote\_by\_id'

Retrieves a single quote specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- quote_id: string - unique Quote object id

**Returns:**
- err: Error - occured error or null for success
- result: Quote - retrieved quote, null if object wasn't found 

### <a name="operation4"></a> Cmd: 'create_quote'

Creates a new quote

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- quote: Quote - Quote object to be created. If object id is not defined it is assigned automatically.

**Returns:**
- err: Error - occured error or null for success
- result: Quote - created quote object

### <a name="operation5"></a> Cmd: 'update_quote'

Updates quote specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- quote_id: string - unique quote id
- quote: Quote - quote object with new values. Partial updates are supported

**Returns:**
- err: Error - occured error or null for success
- result: Quote - updated quote object 
 
### <a name="operation6"></a> Cmd: 'delete_quote'

Deletes quote specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- quote_id: string - unique quote id

**Returns:**
- err: Error - occured error or null for success

 