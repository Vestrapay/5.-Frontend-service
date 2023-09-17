export {}
// import React, { useState, useRef, useEffect } from 'react'
// import { CalendarIconSm, ChevronDownIcon } from '@/components/reusables/icons'
// import cn from 'classnames'
// import { IDateDropdown } from '@/components/reusables/DropDown/interface'
// import { useAppState } from '@/react-wrappers/stores/redux/app/slices'
// // import {CalendarInput} from "@/components/reusables/Inputs/VencruDatePicker";

// type Props = {
//   selectedDateFormat?: string
//   dateFormats: IDateDropdown[]
//   onSelection?: (selection: any, index: number) => void
//   className?: string;
// }

// const DateDropdown: React.FC<Props> = ({
//   selectedDateFormat,
//   dateFormats,
//   onSelection,
//   className,
// }) => {
//   //Redux Store
//   const appState = useAppState();
//   const [showDropdown, setShowDropdown] = useState<boolean>(false)
//   const [showCalendarPopup, setShowCalendarPopup] = useState<boolean>(false)

//   const toggleDropdown = () => {
//     setShowDropdown((prevState: boolean) => !prevState)
//   }

//   const node = useRef<any>(null)

//   const handleClick = (e: any) => {
//     if (node.current.contains(e.target)) {
//       return
//     }
//     setShowDropdown(false)
//   }

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClick)
//     return () => {
//       document.removeEventListener('mousedown', handleClick)
//     }
//   }, [])

//   useEffect(() => {}, [])

//   const renderDateFormats = dateFormats.map(
//     (date: IDateDropdown, index: number) => {
//       if (date.format?.toLowerCase() !== 'custom') {
//         return (
//           <React.Fragment key={`${date.id}${date.format}${index}`}>
//             <div
//               className="w-full px-6 py-3 border-b border-b-[#dee0e3] cursor-pointer hover:bg-gray-550 transition all ease-in-out flex items-center space-x-[10px]"
//               onClick={() => onSelection && onSelection(date, index)}
//             >
//               <div>
//                 <div
//                   className={cn(
//                     'h-4 w-4 rounded-full flex items-center justify-center border',
//                     {
//                       'border-gray-light': !date.isSelected,
//                       'border-primary-blue': date.isSelected,
//                     },
//                   )}
//                 >
//                   <div
//                     className={cn(
//                       'w-[6.4px] h-[6.4px] rounded-full bg-primary-blue',
//                       {
//                         block: date.isSelected,
//                         hidden: !date.isSelected,
//                       },
//                     )}
//                   ></div>
//                 </div>
//               </div>
//               <p className="text-xs font-interRegular text-black-200">
//                 {date.format}
//               </p>
//             </div>
//           </React.Fragment>
//         )
//       } else {
//         return (
//           <React.Fragment key={`${date.id}${date.format}${index}`}>
//             <div
//               className="w-full px-6 py-3 border-b border-b-[#dee0e3] cursor-pointer hover:bg-gray-550 transition all ease-in-out flex items-start space-x-[10px]"
//               onClick={() => onSelection && onSelection(date, index)}
//             >
//               <div>
//                 <div
//                   className={cn(
//                     'h-4 w-4 rounded-full flex items-center justify-center border',
//                     {
//                       'border-gray-light': !date.isSelected,
//                       'border-primary-blue': date.isSelected,
//                     },
//                   )}
//                 >
//                   <div
//                     className={cn(
//                       'w-[6.4px] h-[6.4px] rounded-full bg-primary-blue',
//                       {
//                         block: date.isSelected,
//                         hidden: !date.isSelected,
//                       },
//                     )}
//                   ></div>
//                 </div>
//               </div>
//               <div className="flex flex-wrap">
//                 <div className="w-full mb-[13px]">
//                   <p className="text-xs font-interRegular text-black-200">
//                     {date.format}
//                   </p>
//                 </div>
//                 <div className="w-full flex flex-wrap">
//                   <div className="w-full">
//                     {/* <CalendarInput /> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </React.Fragment>
//         )
//       }
//     },
//   )

//   return (
//     <>
//       <div className="min-w-[145px] h-12 flex items-center relative" ref={node}>
//         <button
//           className={`${className} ${cn(
//             'flex justify-between w-full items-center bg-white h-full border border-gray-750 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] px-3.5',
//             {
//               'rounded-t-lg': showDropdown,
//               'rounded-lg': !showDropdown,
//             },
//           )}`}
//           onClick={toggleDropdown}
//         >
//           <div className="flex space-x-4 items-center">
//             <div>
//               <CalendarIconSm />
//             </div>
//             <div>
//               <p className="text-sm font-interRegular text-black-100">
//                 {appState.businessSummaryDisplay}
//               </p>
//             </div>
//           </div>
//           <div>
//             <ChevronDownIcon />
//           </div>
//         </button>
//         <div
//           className={cn(
//             'w-[145px] rounded-b-lg shadow-[0px_0px_12px_rgba(0,0,0,0.2)] flex flex-wrap absolute bg-white bottom-[-230px] z-10',
//             {
//               block: showDropdown,
//               hidden: !showDropdown,
//             },
//           )}
//         >
//           {renderDateFormats}
//         </div>
//       </div>
//     </>
//   )
// }

// export default DateDropdown
