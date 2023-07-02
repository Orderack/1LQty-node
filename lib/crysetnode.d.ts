export declare class CrysetNode {
    private port;
    private host;
    private authorizationKey;
    constructor(options?: any);
    static fromObject(data: any): CrysetNode;
    toObject(): {
        port: Number;
        host: String;
        auth: any;
    };
    _call(path: any, method: any, data?: any): Promise<{
        statusMessage: any;
        statusCode: any;
        data: any;
    }>;
    importAddress({ address }: {
        address: String;
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
    getRawMempool(): Promise<{
        statusMessage: any;
        statusCode: any;
        data: any;
    }>;
    getMempoolInfo(): Promise<{
        statusMessage: any;
        statusCode: any;
        data: any;
    }>;
    getFees(): Promise<{
        statusMessage: any;
        statusCode: any;
        data: any;
    }>;
    importMultiAddress({ addresses }: {
        addresses: String[];
    }): Promise<{
        statusMessage: string;
        statusCode: any;
        data: any;
    }>;
}
