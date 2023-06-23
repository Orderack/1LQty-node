import yargs from "yargs";
import { camelCase } from "change-case";
import { CrysetNode } from "./crysetnode";


export async function loadRpc(options) {
  const rpcOptions = {}
  rpcOptions["host"] = options.host;
  rpcOptions["port"] = options.port;
  const rpc = CrysetNode.fromObject(rpcOptions);
  return rpc;
}

export async function callAPI(command, data, options = {}) {
  const client = await loadRpc(options);
  const camelCommand = camelCase(command);
  if (!client[camelCommand]) throw Error("command not foud: " + command);
  const result = await client[camelCommand](data);
  console.log(JSON.stringify(result, null, 2));
  return result;
}

export async function runCLI() {
  const [command] = yargs.argv._;
    const options = Object.assign({}, yargs.argv);
    delete options._;
    switch (command) {
      case "load":
        return await loadRpc(yargs.argv._[1]);
        break;
      default:
        return await callAPI(yargs.argv._[0], options);
        break;
    }
}
