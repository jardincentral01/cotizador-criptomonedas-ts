import { CryptoPriceSchema, CryptosSchema } from "../schemas/crypto-schema";
import axios from "axios";
import { Search } from "../types";

export async function getCryptos(){
    try {
        const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`
        const {data: { Data }} = await axios(url);
        const result = CryptosSchema.safeParse(Data);
        if(result.success){
            return result.data
        }
    } catch (error) {
        console.log(error)
    }

}

export async function getCryptoPrice(search: Search){
    try {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${search.crypto}&tsyms=${search.currency}`
        const {data: {DISPLAY}} = await axios(url);
        console.log(DISPLAY)
        const result = CryptoPriceSchema.safeParse({...DISPLAY[search.crypto][search.currency], NAME: search.crypto});
        if(result.success){
            return result.data
        }
    } catch (error) {
        console.log(error)
    }

}