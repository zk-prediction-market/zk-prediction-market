import { Proof } from "./types"
/**
 * If you want to change the default logging filter, call this method before calling prove or verify
 * For the filter syntax consult: https://docs.rs/tracing-subscriber/latest/tracing_subscriber/filter/struct.EnvFilter.html#example-syntax
 * @param logging_filter
 */
export declare const set_logging_filter: (logging_filter: string) => Promise<void>
export declare const prove: (
    url: string,
    options: {
        notaryUrl: string
        websocketProxyUrl: string
        method?: string | undefined
        headers?:
            | {
                  [key: string]: string
              }
            | undefined
        body?: string | undefined
        maxSentData?: number | undefined
        maxRecvData?: number | undefined
        maxTranscriptSize?: number | undefined
        secretHeaders?: string[] | undefined
        secretResps?: string[] | undefined
    }
) => Promise<Proof>
export declare const verify: (
    proof: Proof,
    publicKeyOverride?: string
) => Promise<{
    time: number
    sent: string
    recv: string
    notaryUrl: string
}>
//# sourceMappingURL=index.d.ts.map
