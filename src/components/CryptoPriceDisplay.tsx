import { useMemo } from "react"
import { useCryptoStore } from "../store"
import Spinner from "./Spinner"


function CryptoPriceDisplay() {

    const crypto = useCryptoStore(state => state.crypto)
    const isLoading = useCryptoStore((state) => state.isLoading)
    const cryptoHasInfo = useMemo(() => !Object.values(crypto).includes(""), [crypto])

    return (
        <div className="mt-[3rem]">
            {isLoading ? <Spinner/> : cryptoHasInfo && (
                <>
                    <h2 className="text-[3rem] font-bold text-center">Cotización</h2>

                    <div className="flex justify-center items-center gap-[4rem] mt-[2rem]">
                        <div className="">
                            <p className="mb-[1rem] text-[1.6rem]">El precio es de: <span className="font-bold">{crypto.PRICE}</span></p>
                            <p className="mb-[1rem] text-[1.6rem]">Precio áximo del día: <span className="font-bold">{crypto.HIGHDAY}</span></p>
                            <p className="mb-[1rem] text-[1.6rem]">Precio mínimo del día: <span className="font-bold">{crypto.LOWDAY}</span></p>
                            <p className="mb-[1rem] text-[1.6rem]">Variación últimas 24 horas: <span className="font-bold">{crypto.CHANGEPCT24HOUR}</span></p>
                            <p className="mb-[1rem] text-[1.6rem]">Ultima actualización: <span className="font-bold">{crypto.LASTUPDATE}</span></p>
                        </div>

                        <img className="w-1/4" src={`https://cryptocompare.com/${crypto.IMAGEURL}`} alt={crypto.NAME}/>
                    </div>
                </>
            )}
        </div>
    )
}

export default CryptoPriceDisplay
