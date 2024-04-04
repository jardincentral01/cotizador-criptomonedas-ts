import { Fragment, useEffect, useMemo, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
//import type { DraftExpense } from '../types'
import { currencies } from '../data'
import { Search } from '../types'


type SelectCurrencyProps = {
    search: Search
    setSearch: React.Dispatch<React.SetStateAction<Search>>
}

export default function SelectCurrency({search, setSearch}: SelectCurrencyProps) {
  const [currencyCode, setCurrencyCode] = useState("")

  const selectedCurrency = useMemo(() => currencies.find(cur => cur.code == currencyCode), [currencyCode])

  const handleChange = (value:string) =>{
    setCurrencyCode(value)
  }

  useEffect(() => {
    setSearch({
        ...search,
        currency: currencyCode
    })
  }, [currencyCode])

  return (
    <div className="">
      <Listbox value={currencyCode} onChange={handleChange}>
        <div className="">
          <Listbox.Button className="relative w-full cursor-default bg-[#ecebeb] p-[1rem] rounded-[1rem] text-[1.6rem] text-left focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-400 ">
            <span className="block truncate">{selectedCurrency?.name || "-- Seleccione --"}</span>
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
              {currencies.map(cur => (
                <Listbox.Option
                  key={cur.code}
                  className={({ active }) =>
                    `relative cursor-default select-none py-[0.8rem] pl-[4rem] pr-[1.6rem] ${
                      active ? 'bg-teal-100 text-teal-900' : 'text-gray-900'
                    }`}
                  value={cur.code}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {cur.name}
                      </span>
                      {selected ? (
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-[1.2rem] bg-teal-100 text-teal-900 `}>
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
