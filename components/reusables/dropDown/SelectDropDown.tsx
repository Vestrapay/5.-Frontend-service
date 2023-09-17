/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { DefaultInput } from "@/components/reusables";
import { BsCheck, BsSearch } from 'react-icons/bs'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { SelectDropDownProps } from './interface'

const SearchDropDown = ({
  label,
  name,
  placeHolder = '',
  onHandleShowOption,
  onHandleChange,
  placeholderTitle,
  value,
  error,
  options,
  variant,
  valueVariant,
  optionsVariant,
  containerVariant,
  addBtn,
  btnvariant,
  required,
  isDisabled,
}: SelectDropDownProps) => {
  type item = {
    [key: string]: any
  }
  //Business category
  const [defaultValue, setDefaultValue] = useState('')
  const [showOption, setShowOption] = useState(false)
  const [dropSearchValue, setDropSearchValue] = useState('')

  //Variable for filteering options
  const filteredOptions =
    dropSearchValue === ''
      ? options
      : options.filter((selected: any) =>
        selected.label
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(dropSearchValue.toLowerCase().replace(/\s+/g, '')),
      )

  useEffect(() => {
    setDefaultValue(value || !showOption ? placeHolder : "")
  })

  const handleSelect = (item: any) => {
    //Send selected to form
    setDefaultValue(item.label)
    setShowOption(false)
    onHandleShowOption && onHandleShowOption(false)
    //Send to form
    onHandleChange(null, JSON.stringify(item))
  }

  return (
    <div className={`${containerVariant} w-full relative z-5`}>
      <label className="mb-[2.5px] text-gray-200 text-sm font-[Inter-Medium]">
        {label} {required ? <span className="text-red-100">*</span> : ''}
      </label>
      <Combobox
        value={defaultValue}
        onChange={(item) => console.log(item) /*handleSelect*/}
        defaultValue={''}
      >
        <div className="relative mt-1">
          <div className={`${variant} ${error ? 'border-red-500 mb-1' : ''} relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none sm:text-sm`}>
            <>
              <Combobox.Button
                className="w-full border-none "
                onClick={(e: any) => { setShowOption(!showOption); setDefaultValue("") }}
              >
                <>
                  {isDisabled ?

                    <DefaultInput
                      type="text"
                      placeHolder="Start typing to filter"
                      variant="w-full border border-gray-light py-3 pl-2.5 leading-1 pr-10 text-black-100 text-sm focus:bg-blue-100 focus:border-primary-blue focus:border-[0.5px] rounded-lg placeholder:text-black-100 font-[Inter-Regular]"
                      containerVariant="mt-[0.5px]"
                      value={defaultValue}
                      isDisabled={isDisabled}
                      name={name}
                    />
                    : <Combobox.Input
                      placeholder="Start typing to filter"
                      className="w-full border border-gray-light h-11 py-2.5 pl-2.5 leading-1 pr-10 text-black-100 text-sm focus:bg-blue-100 focus:border-primary-blue focus:border-[0.5px] rounded-lg placeholder:text-black-100 font-[Inter-Regular]"
                      displayValue={(selected: any) => selected}
                      onChange={(event) => setDropSearchValue(event.target.value)}
                      onBlur={(e: any) => setShowOption(false)}
                    />
                  }
                  {(active: any) => console.log(active)}
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                    {isDisabled ? null : !showOption ? (
                      <RiArrowDownSLine
                        color={'#4d4d4d'}
                        className="w-4 h-4 text-gray-200 font-[Inter-SemiBold]  absolute right-3 top-[40%] -mt-1 cursor-pointer"
                        size={10}
                      />
                    ) : (
                      <RiArrowUpSLine
                        color={'#4d4d4d'}
                        className="w-4 h-4 text-gray-200 font-[Inter-SemiBold]  absolute right-3 top-[40%] -mt-1 cursor-pointer"
                      />
                    )}
                  </span>
                </>
              </Combobox.Button>
            </>
          </div>
          {isDisabled ? null :
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setDropSearchValue('')}
            >
              <Combobox.Options className={`absolute text-center mt-1 xxs:scrollbar-hide thin-scrollbar max-h-60 w-full z-[100] overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-gray-light ring-opacity-1 focus:outline-none sm:text-sm ${optionsVariant}`}>
                {/* <div className="relative my-4 px-4">
                  <BsSearch className="absolute ml-2 z-100 top-[23.5px] w-3 h-3 -mt-3 cursor-pointer" color="#999" />
                  <Combobox.Input
                    className=" w-full  pl-6 border-none py-2 rounded-3xl focus:border-opacity-1 focus:border-gray-light leading-1 pr-12s text-black-100 text-[0.8rem]  bg-blue-100 rounded-lg  placeholder:text-gray-lighter text-sm font-[Inter-Regular]"
                    // displayValue={(selected: any) => selected}
                    onChange={(event) => setDropSearchValue(event.target.value)}
                    onBlur={(e: any) => setShowOption(false)}
                    placeholder={"Search"}
                  />
                </div> */}

                {filteredOptions.length === 0 && dropSearchValue !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4  text-sm font-[inter-Regular] text-black-100 ">
                    Nothing found.
                  </div>
                ) : (
                  filteredOptions.map(
                    (item: item, index: React.Key | null | undefined) => (
                      <Combobox.Option
                        key={`${item.value}-${index}`}
                        className={({ active }) =>
                          `relative  text-left cursor-default border-b border-gray-lighter select-none py-2 text-lg font-[Inter-Medium]  ${active
                            ? 'bg-gray-lighter text-black-100'
                            : 'text-black-100'
                          }`
                        }
                        value={item}
                        onClick={(e: any) => handleSelect(item)}
                      >
                        {({ selected, active }) => (
                          <>
                            <div
                              className={`w-full h-auto flex flex-col justify-start px-2 block truncate text-lg ${selected
                                ? ' font-[inter-Medium]'
                                : ' font-[inter-Regular]'
                                }`}
                            >
                              <p className="text-xxs font-[inter-Medium]">
                                {item.placeholderTitle}
                              </p>
                              <p className="text-xs font-[inter-Regular] ml-2 my-1">
                                {item.label}
                              </p>
                            </div>

                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-blue-600'
                                  }`}
                              >
                                <BsCheck className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ),
                  )
                )}
                {addBtn && (
                  <div
                    className={` ${btnvariant} px-3 h-10 flex items-center cursor-pointer`}
                  >
                    {addBtn}
                  </div>
                )}
              </Combobox.Options>
            </Transition>
          }
        </div>
      </Combobox>
    </div>
  )
}

export default SearchDropDown
