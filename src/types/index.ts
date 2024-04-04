import { z } from "zod"
import { CryptoPriceSchema, CryptoSchema, CurrencySchema, SearchSchema } from "../schemas/crypto-schema"

export type Currency = z.infer<typeof CurrencySchema>

export type Crypto = z.infer<typeof CryptoSchema>

/* export type Search = {
    currency: Currency['code']
    crypto: string
} */

export type Search = z.infer<typeof SearchSchema>
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>