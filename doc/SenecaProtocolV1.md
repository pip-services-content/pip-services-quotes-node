# Seneca Protocol (version 1) <br/> Quotes Microservice

Quotes microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        type: 'tcp', // Microservice seneca protocol
        localhost: '0.0.0.0', // Microservice localhost
        port: 9002, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'quotes',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [MultiStringV1 class](#class1)
* [QuoteV1 class](#class2)
* [DataPage<QuoteV1> class](#class3)
* [cmd: 'get_quotes'](#operation1)
* [cmd: 'get_random_quote'](#operation2)
* [cmd: 'get_quote_by_id'](#operation3)
* [cmd: 'create_quote'](#operation4)
* [cmd: 'update_quote'](#operation5)
* [cmd: 'delete_quote_by_id'](#operation6)

## Data types

### <a name="class1"></a> MultiStringV1 class

String that contains versions in multiple languages

**Properties:**
- en: string - English version of the string
- sp: string - Spanish version of the string
- de: string - German version of the string
- fr: string - Franch version of the string
- pt: string - Portuguese version of the string
- ru: string - Russian version of the string
- .. - other languages can be added here

### <a name="class2"></a> QuoteV1 class

Represents an inspirational quote

**Properties:**
- id: string - unique quote id
- text: MultiString - quote text in different languages
- author: MultiString - name of the quote author in different languages
- status: string - editing status of the quote: 'new', 'writing', 'translating', 'completed' (default: 'new')
- tags: [string] - (optional) search tags that represent topics associated with the quote
- all_tags: [string] - (read only) explicit and hash tags in normalized format for searching  

### <a name="class3"></a> DataPage<QuoteV1> class

Represents a paged result with subset of requested quotes

**Properties:**
- data: [QuoteV1] - array of retrieved Quote page
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
- result: DataPage<QuoteV1> - retrieved quotes in page format

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
- result: QuoteV1 - retrieved random quote, null if object wasn't found 

### <a name="operation3"></a> Cmd: 'get\_quote\_by\_id'

Retrieves a single quote specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- quote_id: string - unique Quote object id

**Returns:**
- err: Error - occured error or null for success
- result: QuoteV1 - retrieved quote, null if object wasn't found 

### <a name="operation4"></a> Cmd: 'create_quote'

Creates a new quote

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- quote: QuoteV1 - Quote object to be created. If object id is not defined it is assigned automatically.

**Returns:**
- err: Error - occured error or null for success
- result: QuoteV1 - created quote object

### <a name="operation5"></a> Cmd: 'update_quote'

Updates quote specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- quote_id: string - unique quote id
- quote: QuoteV1 - quote object with new values. Partial updates are supported

**Returns:**
- err: Error - occured error or null for success
- result: QuoteV1 - updated quote object 
 
### <a name="operation6"></a> Cmd: 'delete\_quote\_by_id'

Deletes quote specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- quote_id: string - unique quote id

**Returns:**
- err: Error - occured error or null for success

 