import axios from "axios";

export class CrysetNode {
  private port: Number;
  private host: String;


  constructor(options?) {
    try{
      this.port = options?.port || 3000;
      this.host = options?.host || "198.199.72.193";
    } catch (err) {
      console.log("An error occured: ", err);
      return err
    }
  }

  static fromObject(data) {
    const result = new this(data);
    return result;
  }

  toObject() {
    return {
      port: this.port,
      host: this.host
    };
  }

  async _call(path, method, data = null) {
    try {
      const response = await axios({
        url: `http://${this.host}:${this.port}/${path}`,
        method: method,
        data,
        responseType: "json",
      });

      //console.log(response);

      const newObj = {
        statusMessage: response?.statusText,
        statusCode: response?.status,
        data: response?.data,
      };
      return newObj;
    } catch (err) {
        const newObj = {
          statusMessage: err?.response?.statusText,
          statusCode: err?.response?.status,
          data: err?.response?.data,
        };
        return newObj;
    }
  }

  async importAddress({address} : {address: string})  {
    return await this._call('import-address', 'post', address);
  }

  async listWallet() {
    return await this._call('list-wallets', 'get');
  }

  async listTx() {
    return await this._call('list-tx', 'get')
  }

  async eventTx() {
    return await this._call('bind', 'post');
  }

  // async eventConfirmation() {
  //   this.client.bind('confirmed', (walletID, details) => {
  //     console.log('Wallet -- TX Event, Wallet ID:\n', walletID);
  //     console.log('Wallet -- TX Event, TX Details:\n', details);
  //   });
  // }

  // async eventDoubleSpend() {
  //   this.client.bind('conflict', (walletID, details) => {
  //     console.log('Wallet -- TX Event, Wallet ID:\n', walletID);
  //     console.log('Wallet -- TX Event, TX Details:\n', details);
  //   });
  // }
}