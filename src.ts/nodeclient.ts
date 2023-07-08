import axios from "axios";

export class NodeClient {
  private port: Number;
  private host: String;
  private authorizationKey;

  constructor(options?) {
    try {
      this.port = options.port;
      this.host = options.host;
      this.authorizationKey = options.auth;
    } catch (err) {
      return err;
    }
  }

  static fromObject(data) {
    const result = new this(data);
    return result;
  }

  toObject() {
    return {
      port: this.port,
      host: this.host,
      auth: this.authorizationKey,
    };
  }

  async _call(path, method, data = null) {
    const headers = {
      Authorization: this.authorizationKey,
    };

    try {
      const response = await axios({
        url: `http://${this.host}:${this.port}/${path}`,
        method: method,
        data,
        responseType: "json",
        headers: headers,
      });

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

  async importAddress({ address }: { address: String }) {
    return await this._call("import-address", "post", { address: address });
  }

  async listWallet() {
    return await this._call("list-wallets", "get");
  }

  async listTx() {
    return await this._call("list-tx", "get");
  }

  async getRawMempool() {
    return await this._call("mempool", "get");
  }

  async getMempoolInfo() {
    return await this._call("mempool-info", "get");
  }

  async getFees() {
    return await this._call("get-fees", "get");
  }

  async subscribe({webhookUrl, rbf = false}: {webhookUrl: string, rbf?: boolean }) {
    return await this._call("subscribe-webhook", "post", { webhookUrl: webhookUrl, rbf: rbf });
  }

  async importMultiAddress({ addresses }: { addresses: String[] }) {
    for (let i = 0; i < addresses.length; i++) {
      const response = await this.importAddress({ address: addresses[i] });
      if (response.statusCode != 200) {
        const eMessage = "An error occured when importing " + addresses[i];
        return {
          statusMessage: eMessage,
          statusCode: response.statusCode,
          data: response.data,
        };
      }
    }
    const successPayload = {
      statusMessage: "OK",
      statusCode: 200,
      data: {
        success: true,
      },
    };
    return successPayload;
  }

  async importSubscribe ({addresses, webhookUrl, rbf}: { addresses: String[], webhookUrl: string, rbf?: boolean }) {
      await this.importMultiAddress({addresses});
      await this.subscribe({webhookUrl, rbf});
  }
}
