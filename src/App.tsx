import { useEffect } from "react"
import Form from "./components/Form"
import { useCryptoStore } from "./store"
import CryptoPriceDisplay from "./components/CryptoPriceDisplay"


function App() {

    const fetchCryptos = useCryptoStore((state) => state.fetchCryptos)
    

    useEffect(() => {
        fetchCryptos()
    }, [])

    return (
        <>
            <div className="max-w-[60rem] w-[95%] mx-auto">
                <h1 className="text-[3.8rem] font-black text-white leading-[.9]">Cotizador de <span className="text-[4.4rem] text-emerald-400 block">Criptomonedas</span></h1>

                <div className="mt-[4rem] py-[5rem] px-8 bg-white rounded-[1rem] shadow-xl">
                    <Form/>
                    <CryptoPriceDisplay/>
                </div>
            </div>
        </>
    )
}

export default App
