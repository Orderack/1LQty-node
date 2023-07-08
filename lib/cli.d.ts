import { NodeClient } from "./nodeclient";
export declare function loadRpc(options: any): Promise<NodeClient>;
export declare function callAPI(command: any, data: any): Promise<any>;
export declare function runCLI(): Promise<any>;
