import { Fragment, useEffect, useMemo, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
//import type { DraftExpense } from '../types'
import { Crypto, Search } from '../types'
import { useCryptoStore } from '../store'


type SelectCryptoProps = {
    search: Search
    setSearch: React.Dispatch<React.SetStateAction<Search>>
}

export default function SelectCrypto({search, setSearch}: SelectCryptoProps) {
  const [cryptoName, setCryptoName] = useState<Crypto['CoinInfo']['Name']>("")
  const cryptos = useCryptoStore((state) => state.cryptos)

  const selectedCrypto = useMemo(() => cryptos.find(crypto => crypto.CoinInfo.Name == cryptoName), [cryptoName])

  const handleChange = (value:string) =>{
    setCryptoName(value)
  }

  useEffect(() => {
    setSearch({
        ...search,
        crypto: cryptoName
    })
  }, [cryptoName])

  return (
    <div className="">
      <Listbox value={cryptoName} onChange={handleChange}>
        <div className="">
          <Listbox.Button className="relative w-full cursor-default bg-[#ecebeb] p-[1rem] rounded-[1rem] text-[1.6rem] text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-400 ">
            <span className="block truncate">{selectedCrypto?.CoinInfo.FullName || "-- Seleccione --"}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-[.8rem">
              <ChevronUpDownIcon
                className="h-[2rem] w-[2rem] text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-[0.4rem] max-h-[24rem] w-full overflow-auto rounded-[.6rem] bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none text-[1.5rem] z-50">
            <Listbox.Option
                    className={({ active }) =>
                    `relative cursor-default select-none py-[0.8rem] pl-[4rem] pr-[1.6rem] ${
                      active ? 'bg-teal-100 text-teal-900' : 'text-gray-900'
                    }`}
                    value={""}
                >
                    {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        -- Seleccione --
                      </span>
                      {selected ? (
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-[1.2rem] bg-teal-100 text-teal-900 `}>
                          <CheckIcon className="h-[2rem] w-[2rem]" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              {cryptos.map(crypto => (
                <Listbox.Option
                  key={crypto.CoinInfo.Name}
                  className={({ active }) =>
                    `relative cursor-default select-none py-[0.8rem] pl-[4rem] pr-[1.6rem] ${
                      active ? 'bg-teal-100 text-teal-900' : 'text-gray-900'
                    }`}
                  value={crypto.CoinInfo.Name}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {crypto.CoinInfo.FullName}
                      </span>
                      {selected ? (
                        <span className={`absolute inset-y-0 left-0 flex items-center justify-center w-[3rem] bg-teal-100 text-teal-900 `}>
                          <CheckIcon className="h-[2rem] w-[2rem]" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
