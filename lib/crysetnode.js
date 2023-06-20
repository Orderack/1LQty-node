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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrysetNode = void 0;
const { WalletClient } = require('bclient');
class CrysetNode {
    constructor(options) {
        try {
            this.network = (options === null || options === void 0 ? void 0 : options.network) || "main";
            this.port = (options === null || options === void 0 ? void 0 : options.port) || 8334;
            this.host = (options === null || options === void 0 ? void 0 : options.host) || "157.90.17.37";
            const clientOptions = {
                network: this.network,
                port: this.port,
                host: this.host,
            };
            const walletClient = new WalletClient(clientOptions);
            this.client = walletClient.wallet('cryset');
            (() => __awaiter(this, void 0, void 0, function* () {
                yield this.client.open();
                yield this.client.join('*');
            }))();
        }
        catch (e) {
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
    importAddress({ address }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.importAddress('default', address);
            return result;
        });
    }
    eventTx() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.bind('tx', (walletID, details) => {
                console.log('Wallet -- TX Event, Wallet ID:\n', walletID);
                console.log('Wallet -- TX Event, TX Details:\n', details);
            });
        });
    }
    eventConfirmation() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.bind('confirmed', (walletID, details) => {
                console.log('Wallet -- TX Event, Wallet ID:\n', walletID);
                console.log('Wallet -- TX Event, TX Details:\n', details);
            });
        });
    }
    eventDoubleSpend() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.bind('conflict', (walletID, details) => {
                console.log('Wallet -- TX Event, Wallet ID:\n', walletID);
                console.log('Wallet -- TX Event, TX Details:\n', details);
            });
        });
    }
}
exports.CrysetNode = CrysetNode;
//# sourceMappingURL=crysetnode.js.map