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
nodeclient load --host "198.x.x.103"  --port 3000 --auth "authkey"    

```

returns 

```
NodeClient {
  port: 3000,
  host: "198.x.x.103" ,
  authorizationKey: 'authkey'
}
```

Call methods on the nodeclient object as commands with **snake-case**. If the method requires a parameter, pass it along with the config. e.g --address below:

```
nodeclient import-address --address "33...H" --host "198.x.x.103" --port 3000 --auth "authkey"

```

returns

```
NodeClient {
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
yarn add https://github.com/Orderack/1LQty-node

```

To call methods (for example importAddress):

```
import { NodeClient } from "nodeclient";

const client = new NodeClient({
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
NodeClient {
  port: 3000,
  host: '198.x.x.103',,
  authorizationKey: 'authkey'
}

{ statusMessage: 'OK', statusCode: 200, data: { success: true } }

```

If an error occurs while importing any of the wallets, it will return an error similar to 

```
NodeClient {
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


To import multiple wallets and subscribe to a webhook URl example:


```
const addresses = ["1Kr6...1g", "3EMq...zG", "39mY...JE"];
const webhookUrl = "http:// https://sandbox-api.oneliquidity.technology/trading/v1/webhook/node/btc/notification"
const rbf = true //Set this to true to get doublespending information. Default value is false

await client.importSubscribe({addresses, webhookUrl, rbf});

```

When there's a new transaction notification, the webhook should return a payload similar to:

```
{
  to_address: '1Kr6...1g',
  txid: '08f....27c',
  amount_btc: 0.00001,
  block_height: null,
  currency: 'BTC',
  confirm_blocks: 0,
  time: 1688814734,
  date: '2023-07-08T11:12:14Z',
  fees: 852,
  feerate: '6.042/vB',
  mempool_fee_rates: {
    'High-Priority': '20.52/vB',
    'Medium-Priority': '17.26/vB',
    'Low-Priority': '14/vB'
  },
  from_address: [ 'bc1q....ysj' ],
  replace_by_fee: false,
  Double_spend_risk: 'None'
}

```