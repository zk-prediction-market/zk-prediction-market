export declare const DEFAULT_LOGGING_FILTER: string
export default class TLSN {
    private startPromise
    private resolveStart
    private logging_filter
    /**
     * Initializes a new instance of the TLSN class.
     *
     * @param logging_filter - Optional logging filter string.
     *                         Defaults to DEFAULT_LOGGING_FILTER
     */
    constructor(logging_filter?: string)
    start(): Promise<void>
    waitForStart(): Promise<void>
    prove(
        url: string,
        options?: {
            method?: string
            headers?: {
                [key: string]: string
            }
            body?: string
            maxSentData?: number
            maxRecvData?: number
            maxTranscriptSize?: number
            notaryUrl?: string
            websocketProxyUrl?: string
            secretHeaders?: string[]
            secretResps?: string[]
        }
    ): Promise<any>
    verify(proof: any, pubkey: string): Promise<any>
}
//# sourceMappingURL=tlsn.d.ts.map
