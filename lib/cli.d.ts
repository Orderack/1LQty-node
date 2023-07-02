import { CrysetNode } from "./crysetnode";
export declare function loadRpc(options: any): Promise<CrysetNode>;
export declare function callAPI(command: any, data: any): Promise<any>;
export declare function runCLI(): Promise<any>;
