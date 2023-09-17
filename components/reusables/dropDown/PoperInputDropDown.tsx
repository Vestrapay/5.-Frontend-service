export {}
// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect, useRef, Fragment, Children } from "react";
// import useOutsideAlerter from "@/hooks/useOutsideAlerter";
// import { Combobox, Popover, Transition } from '@headlessui/react'
// import { DefaultInput } from "@/components/reusables";
// import { BsCheck, BsSearch } from 'react-icons/bs'
// import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'

// import { ItemDropDownProps } from './interface'


// const PopDropDown = ({
//     label,
//     name,
//     placeHolder = "",
//     onHandleShowOption,
//     onHandleChange,
//     placeholderTitle,
//     value,
//     error,
//     options,
//     variant,
//     valueVariant,
//     containerVariant,
//     addBtn,
//     btnvariant,
//     innerVariant,
//     optionContainerVariant,
//     optionVariant,
//     required,
//     children,
//     isDisabled,
// }: ItemDropDownProps) => {
//     type item = {
//         [key: string]: any
//     }

//     const [defaultValue, setDefaultValue] = useState('')
//     const [showOption, setShowOption] = useState<any>(false)
//     const [dropSearchValue, setDropSearchValue] = useState('')
//     const [placeHolderVal, setPlaceHolderVal] = useState('')

//     //Variable for filteering options
//     const filteredOptions =
//         dropSearchValue === ''
//             ? options
//             : options.filter((selected: any) =>
//                 selected.label
//                     .toLowerCase()
//                     .replace(/\s+/g, '')
//                     .includes(dropSearchValue.toLowerCase().replace(/\s+/g, '')),
//             )

//     useEffect(() => {
//         setDefaultValue(value || "")
//         setPlaceHolderVal(value || (!showOption ? placeHolder  : placeHolder))
//     })

//     const handleSelect = (item: any) => {
//         //Send selected to form
//         setDefaultValue(item.label)
//         setShowOption(false)
//         onHandleShowOption && onHandleShowOption(false)
//         //Send to form
//         onHandleChange(null, JSON.stringify(item))
//     }

//     const wrapperRef = useRef(null);
//     const inputRef = useRef<any>(null);
//     useOutsideAlerter(wrapperRef, () => setShowOption(false));

//     return (
//         <>
//             <div className={`${containerVariant} z-5 my-0 mx-auto`}>
//                 <label className="mb-[2.5px] text-gray-200 text-sm font-[Inter-Medium]">
//                     {label} {required ? <span className='text-red-100'>*</span> : ""}
//                 </label>
//                 <div onChange={(e: any) => onHandleChange} defaultValue={""}>
//                     <div className="relative">
//                         <div className={`${variant}`}>
//                             <>
//                                 <div
//                                     className={`${innerVariant}`}
//                                     onClick={() => {
//                                         setShowOption(!showOption);
//                                         if (document.activeElement instanceof HTMLElement) {
//                                             document.activeElement.blur();
//                                         } inputRef?.current?.focus();
//                                     }}
//                                 >
//                                     <>
//                                         {isDisabled ?

//                                             <DefaultInput
//                                                 type="text"
//                                                 name={name}
//                                                 placeHolder={placeHolderVal}
//                                                 variant="w-full border border-gray-light py-3 pl-2.5 leading-1 pr-10 text-black-100 focus:bg-blue-100 rounded-lg   placeholder:text-gray-100 text-sm font-[Inter-Regular]"
//                                                 containerVariant="mt-[0.5px]"
//                                                 value={defaultValue}
//                                                 isDisabled={isDisabled}
//                                             />
//                                             :
//                                             <DefaultInput
//                                                 name={name}
//                                                 placeHolder={placeHolderVal}
//                                                 value={dropSearchValue || defaultValue}
//                                                 variant="w-full border border-gray-light py-3 pl-2.5 leading-1 pr-10 text-black-100 focus:bg-blue-100 rounded-lg  placeholder:text-gray-100 text-sm font-[Inter-Regular]"
//                                                 displayValue={(selected: any) => selected}
//                                                 handleChange={(event: any) => {setDropSearchValue(event.target.value);onHandleChange}}
//                                                 onBlur={(e: any) => setShowOption(false)}
//                                                 ref={inputRef}
//                                             />
//                                         }
//                                         {(active: any) => console.log(active)}
//                                         <span className="absolute inset-y-0 right-0 flex items-center pr-2">
//                                             {isDisabled ? null : !showOption ? (
//                                                 <RiArrowDownSLine
//                                                     color={'#4d4d4d'}
//                                                     className="w-4 h-4 text-gray-200 font-[Inter-SemiBold]  absolute right-3 top-[40%] -mt-1 cursor-pointer"
//                                                     size={10}
//                                                 />
//                                             ) : (
//                                                 <RiArrowUpSLine
//                                                     color={'#4d4d4d'}
//                                                     className="w-4 h-4 text-gray-200 font-[Inter-SemiBold]  absolute right-3 top-[40%] -mt-1 cursor-pointer"
//                                                 />
//                                             )}
//                                         </span>
//                                     </>
//                                 </div>
//                             </>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Transition
//                 as={Fragment}
//                 leave="transition ease-in duration-100"
//                 leaveFrom="opacity-100"
//                 leaveTo="opacity-0"
//                 show={showOption}
//                 afterLeave={() => setDropSearchValue('')}
//             >
//                 <div ref={wrapperRef} className={`fixed z-100 text-left mt-1 scrollbar-hide max-h-60 w-max-content z-10 overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-gray-light ring-opacity-1 focus:outline-none sm:text-sm ${optionContainerVariant} min-w-[12%]`}>
//                     {/* <div className="relative my-4 px-4">
//                         <BsSearch className="absolute ml-2 z-100 top-[27.5px] w-3 h-3 -mt-3 cursor-pointer" color="#999" />
//                         <DefaultInput
//                             value={dropSearchValue}
//                             variant=" w-full pl-6 border-none py-2 rounded-3xl focus:border-opacity-1 focus:border-gray-light leading-1 pr-12s text-black-100 text-[0.8rem]  bg-blue-100 rounded-lg  placeholder:text-gray-lighter text-sm font-[Inter-Regular]"
                            
//                             handleChange={(event: any) => setDropSearchValue(event.target.value)}
//                             onBlur={(e: any) => setShowOption(false)}
//                             placeHolder={"Search"}
//                         />
//                     </div> */}

//                     {filteredOptions.length === 0 && dropSearchValue !== '' ? (
//                         <div className="relative cursor-default select-none py-2 px-4  text-sm font-[inter-Regular] text-center text-black-100 ">
//                             Nothing found.
//                         </div>
//                     ) : (
//                         filteredOptions.map(
//                             (item: item, index: React.Key | null | undefined) => (
//                                 <div
//                                     key={`${item.value}-${index}`}
//                                     className={`relative  text-left cursor-default border-b border-gray-lighter select-none py-2 text-lg font-[Inter-Medium] hover:bg-gray-lighter text-black-100`}
//                                     //   value={item}
//                                     onClick={(e: any) => handleSelect(item)}
//                                 >
//                                     <div className={`w-full h-auto flex flex-col justify-start px-2 block truncate text-lg font-[inter-Regular]`}>
//                                         <p className="text-xxs font-[inter-Medium]">
//                                             {item.placeholderTitle}
//                                         </p>
//                                         <p className="text-xs font-[inter-Regular] ml-2 my-1">
//                                             {item.label}
//                                         </p>
//                                     </div>

//                                 </div>
//                             )
//                         )
//                     )}
//                     {addBtn && (
//                         <div
//                             className={` ${btnvariant} px-3 h-10 flex items-center cursor-pointer`}
//                         >
//                             {addBtn}
//                         </div>
//                     )}
//                 </div>
//             </Transition>
//         </>

//     );
// };

// export default PopDropDown;