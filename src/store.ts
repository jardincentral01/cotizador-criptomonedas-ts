import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Crypto, CryptoPrice, Search } from "./types";
import { getCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptos: Crypto[]
    crypto: CryptoPrice
    isLoading: boolean
    fetchCryptos: () => Promise<void>
    fetchCryptoData: (search: Search) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptos: [],
    crypto: {
        IMAGEURL: "",
        PRICE: "",
        HIGHDAY: "",
        LOWDAY: "",
        CHANGEPCT24HOUR: "",
        LASTUPDATE: "",
        NAME: ""
    },
    isLoading: false,
    fetchCryptos: async () => {
        const cryptos = await getCryptos()
        set(() => ({
            cryptos
        }))
    },
    fetchCryptoData: async (search) => {
        set(() => ({
            isLoading: true
        }))
        const crypto = await getCryptoPrice(search)
        set(() => ({
            crypto,
            isLoading: false
        }))
    }
})))