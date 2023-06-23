export declare class CrysetNode {
    private port;
    private host;
    constructor(options?: any);
    static fromObject(data: any): CrysetNode;
    toObject(): {
        port: Number;
        host: String;
    };
    _call(path: any, method: any, data?: any): Promise<{
        statusMessage: any;
        statusCode: any;
        data: any;
    }>;
    importAddress({ address }: {
        address: string;
    }): Promise<{
        statusMessage: any;
        statusCode: any;
        data: any;
    }>;
    listWallet(): Promise<{
        statusMessage: any;
        statusCode: any;
        data: any;
    }>;
    listTx(): Promise<{
        statusMessage: any;
        statusCode: any;
        data: any;
    }>;
    eventTx(): Promise<{
        statusMessage: any;
        statusCode: any;
        data: any;
    }>;
}
