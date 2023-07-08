"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrysetNode = void 0;
const axios_1 = __importDefault(require("axios"));
class CrysetNode {
    constructor(options) {
        try {
            this.port = options.port;
            this.host = options.host;
            this.authorizationKey = options.auth;
        }
        catch (err) {
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
    _call(path, method, data = null) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                Authorization: this.authorizationKey,
            };
            try {
                const response = yield (0, axios_1.default)({
                    url: `http://${this.host}:${this.port}/${path}`,
                    method: method,
                    data,
                    responseType: "json",
                    headers: headers,
                });
                const newObj = {
                    statusMessage: response === null || response === void 0 ? void 0 : response.statusText,
                    statusCode: response === null || response === void 0 ? void 0 : response.status,
                    data: response === null || response === void 0 ? void 0 : response.data,
                };
                return newObj;
            }
            catch (err) {
                const newObj = {
                    statusMessage: (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.statusText,
                    statusCode: (_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.status,
                    data: (_c = err === null || err === void 0 ? void 0 : err.response) === null || _c === void 0 ? void 0 : _c.data,
                };
                return newObj;
            }
        });
    }
    importAddress({ address }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._call("import-address", "post", { address: address });
        });
    }
    listWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._call("list-wallets", "get");
        });
    }
    listTx() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._call("list-tx", "get");
        });
    }
    getRawMempool() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._call("mempool", "get");
        });
    }
    getMempoolInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._call("mempool-info", "get");
        });
    }
    getFees() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._call("get-fees", "get");
        });
    }
    subscribe({ webhookUrl, rbf = false }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._call("subscribe-webhook", "post", { webhookUrl: webhookUrl, rbf: rbf });
        });
    }
    importMultiAddress({ addresses }) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < addresses.length; i++) {
                const response = yield this.importAddress({ address: addresses[i] });
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
        });
    }
    importSubscribe({ addresses, webhookUrl, rbf }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.importMultiAddress({ addresses });
            yield this.subscribe({ webhookUrl, rbf });
        });
    }
    testImpSub() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.importSubscribe({ addresses: ["bc1q4n0420qfw7ja75rykpchw4q4h6z7q4avvz6xqr"], webhookUrl: "http://198.199.72.193:3000/webhook", rbf: true });
        });
    }
}
exports.CrysetNode = CrysetNode;
//# sourceMappingURL=crysetnode.js.map