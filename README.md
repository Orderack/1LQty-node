# cryset-node

Install dependencies

```
yarn
yarn build

```

Install package globally to use command line client

```
npm install -g

```

Each time this library is edited, it needs to be rebuilt with ```yarn build```


Run commands, pass in parameters

```
crysetNode --host "198.x.x.103"  --port 3000 --auth "authkey" 

```

returns 

```
CrysetNode {
  port: 3000,
  host: "198.x.x.103" ,
  authorizationKey: 'authkey'
}
```

Call methods on the oylib object as commands with **snake-case**. If the method requires a parameter, pass it along with the config. e.g --address below:

```
crysetNode import-address --address "33...H" --host "198.x.x.103" --port 3000 --auth "authkey"

```

returns

```
CrysetNode {
  port: 3000,
  host: '198.x.x.103',
  authorizationKey: 'authkey'
}
{
  "statusMessage": "OK",
  "statusCode": 200,
  "data": {
    "success": true
  }
}
```


Can also import as node module. In your project directory run: 

```
yarn add https://github.com/Orderack/cryset-node

```

To call methods (for example importAddress):

```
import { CrysetNode } from "crysetnode";

const client = new CrysetNode({
  port: 3000,
  host: '198.x.x.103',
  authorizationKey: 'authkey'
})

await client.importAddress({address: "33...H"});

```

To import multiple addresses at once:

```
const addresses = ["1Kr6...1g", "3EMq...zG", "39mY...JE"];
await client.importMultiAddress({addresses: addresses})

```

if successful should return something similar to:

```
CrysetNode {
  port: 3000,
  host: '198.x.x.103',,
  authorizationKey: 'authkey'
}

{ statusMessage: 'OK', statusCode: 200, data: { success: true } }

```

If an error occurs while importing any of the wallets, it will return an error similar to 

```
CrysetNode {
  port: 3000,
  host: '198.x.x.103',,
  authorizationKey: 'authkey'
}
{
  statusMessage: 'An error occured when importing 1Kr...61g',
  statusCode: 500,
  data: {
    error: 'Failed to import wallet',
    stack: 'Address already exists.'
  }
}

```
The method iterates through the array and stops immediately it faces an error, this error only refers to the address in the statusMessage
