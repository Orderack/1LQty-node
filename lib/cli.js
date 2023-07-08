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
exports.runCLI = exports.callAPI = exports.loadRpc = void 0;
const yargs_1 = __importDefault(require("yargs"));
const change_case_1 = require("change-case");
const nodeclient_1 = require("./nodeclient");
function loadRpc(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const rpcOptions = {};
        rpcOptions["host"] = options.host;
        rpcOptions["port"] = options.port;
        rpcOptions["auth"] = options.auth;
        const rpc = nodeclient_1.NodeClient.fromObject(rpcOptions);
        console.log(rpc);
        return rpc;
    });
}
exports.loadRpc = loadRpc;
function callAPI(command, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield loadRpc(data);
        const camelCommand = (0, change_case_1.camelCase)(command);
        if (!client[camelCommand])
            throw Error("command not foud: " + command);
        const result = yield client[camelCommand](data);
        console.log(JSON.stringify(result, null, 2));
        return result;
    });
}
exports.callAPI = callAPI;
function runCLI() {
    return __awaiter(this, void 0, void 0, function* () {
        const [command] = yargs_1.default.argv._;
        const options = Object.assign({}, yargs_1.default.argv);
        delete options._;
        switch (command) {
            case "load":
                return yield loadRpc(options);
                break;
            default:
                return yield callAPI(yargs_1.default.argv._[0], options);
                break;
        }
    });
}
exports.runCLI = runCLI;
//# sourceMappingURL=cli.js.map