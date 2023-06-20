const { WalletClient } = require('bclient');

export class CrysetNode {
  private network: String;
  private port: Number;
  private host: String;

  public client

  constructor(options?) {
    try{
      this.network = options?.network || "main";
      this.port = options?.port || 8334;
      this.host = options?.host || "157.90.17.37"

      const clientOptions = {
        network: this.network,
        port: this.port,
        host: this.host,
      }

      const walletClient = new WalletClient(clientOptions);
      this.client = walletClient.wallet('cryset');
      (async () => {
        await this.client.open();
        await this.client.join('*');
      })();
    } catch (e) {
      console.log("An error occured: ", e);
    }
  }

  static fromObject(data) {
    const result = new this(data);
    return result;
  }

  toObject() {
    return {
      network: this.network,
      port: this.port,
      host: this.host
    };
  }

  async importAddress({address} : {address: string})  {
    const result = await this.client.importAddress('default', address);
    return result; 
  }

  async eventTx() {
    this.client.bind('tx', (walletID, details) => {
      console.log('Wallet -- TX Event, Wallet ID:\n', walletID);
      console.log('Wallet -- TX Event, TX Details:\n', details);
    });
  }

  async eventConfirmation() {
    this.client.bind('confirmed', (walletID, details) => {
      console.log('Wallet -- TX Event, Wallet ID:\n', walletID);
      console.log('Wallet -- TX Event, TX Details:\n', details);
    });
  }

  async eventDoubleSpend() {
    this.client.bind('conflict', (walletID, details) => {
      console.log('Wallet -- TX Event, Wallet ID:\n', walletID);
      console.log('Wallet -- TX Event, TX Details:\n', details);
    });
  }
}