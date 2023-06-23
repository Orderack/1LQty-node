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
            this.port = (options === null || options === void 0 ? void 0 : options.port) || 3000;
            this.host = (options === null || options === void 0 ? void 0 : options.host) || "198.199.72.193";
        }
        catch (err) {
            console.log("An error occured: ", err);
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
            host: this.host
        };
    }
    _call(path, method, data = null) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, axios_1.default)({
                    url: `http://${this.host}:${this.port}/${path}`,
                    method: method,
                    data,
                    responseType: "json",
                });
                //console.log(response);
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
            return yield this._call('import-address', 'post', address);
        });
    }
    listWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._call('list-wallets', 'get');
        });
    }
    listTx() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._call('list-tx', 'get');
        });
    }
    eventTx() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._call('bind', 'post');
        });
    }
}
exports.CrysetNode = CrysetNode;
//# sourceMappingURL=crysetnode.js.map