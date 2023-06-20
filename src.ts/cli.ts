
import yargs from "yargs";
import { camelCase } from "change-case";
import { crysetNode } from './crysetnode';


            export async function callAPI(command, data, options = {}) {
              const client = new crysetNode(options);

            const camelCommand = camelCase(command);
    console.log(`${camelCommand}(${data})`);
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
      default:
        return await callAPI(yargs.argv._[0], yargs.argv._[1], options);
        break;
    }
  }
