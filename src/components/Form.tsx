import { FormEvent, useState } from "react"
import { Search } from "../types"
import SelectCurrency from "./SelectCurrency"
import SelectCrypto from "./SelectCrypto"
import Error from "./Error"
import { useCryptoStore } from "../store"

const initialState: Search = {
    currency: "",
    crypto: ""
}

function Form() {

    const [search, setSearch] = useState<Search>(initialState)
    const [error, setError] = useState("")

    const fetchCryptoData = useCryptoStore(state => state.fetchCryptoData)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(Object.values(search).includes("")) return setError("Todos los campos son obligatorios")
        setError("")

        //Consultar API
        fetchCryptoData(search)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-[2rem]">
            {error && <Error>{error}</Error>     }      
            <div className="flex flex-col gap-[.8rem] relative">
                <label className="text-[#182339] font-semibold text-[1.8rem]" htmlFor="currency">Moneda: </label>
                <SelectCurrency
                    search={search}
                    setSearch={setSearch}
                />
            </div>
            <div className="flex flex-col gap-[.8rem] relative">
                <label className="text-[#182339] font-semibold text-[1.8rem]" htmlFor="crypto">Criptomoneda:</label>
                <SelectCrypto
                    search={search}
                    setSearch={setSearch}
                />
            </div>

            <input className="bg-[#61ecbc] text-[#182339] hover:bg-[#0cb387] transition-all p-[.9rem] font-bold cursor-pointer uppercase mt-[1.8rem] text-[1.53rem]" type="submit" value="Buscar"/>
        </form>
    )
}

export default Form
