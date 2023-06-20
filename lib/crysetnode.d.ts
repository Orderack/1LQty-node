export declare class CrysetNode {
    private network;
    private port;
    private host;
    client: any;
    constructor(options?: any);
    static fromObject(data: any): CrysetNode;
    toObject(): {
        network: String;
        port: Number;
        host: String;
    };
    importAddress({ address }: {
        address: string;
    }): Promise<any>;
    eventTx(): Promise<void>;
    eventConfirmation(): Promise<void>;
    eventDoubleSpend(): Promise<void>;
}
