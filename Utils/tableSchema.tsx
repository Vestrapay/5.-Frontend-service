import {GridColDef, GridRowsProp} from "@mui/x-data-grid";
import {CardProviderProps} from "@types"
import {BsThreeDots} from "react-icons/bs";
import React, {useState} from "react";
import {Trash} from "react-huge-icons/bulk";
import Image from "next/image";
import {PenIcon} from "@public/assets";

export const recentTransactionsFields: GridColDef[] = [
    {
        field: "id",
        headerName: "#",
        align: "center",
        headerAlign: "center",
    },
    {
        field: "maskedPan",
        headerName: "Masked PAN",
        flex: 1,
    },
    {
        field: "description",
        headerName: "Description",
        flex: 1,
        cellClassName: "description",
        headerAlign: "left",
        align: "left",
    },
    {
        field: "orderID",
        headerName: "Order ID",
        flex: 1,
    },
    {
        field: "paymentRef",
        headerName: "Payment Ref",
        flex: 1,
    },
    {
        field: "scheme",
        headerName: "Scheme",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: ({row: {cardProvider}}: { row: { cardProvider: CardProviderProps } }) => {
            return (
                <div
                    className={`rounded w-full flex justify-center items-center ${cardProvider.toLowerCase() === "visa" ? "bg-violet-200" : cardProvider.toLowerCase() === "mastercard" ? "bg-orange-500" : "bg-slate-500"}`}>
                    <p className={`text-sm font-bold uppercase ${cardProvider.toLowerCase() === "visa" ? "text-violet-500" : cardProvider.toLowerCase() === "mastercard" ? "text-red" : "text-black"}`}>{cardProvider.toUpperCase()}</p>
                </div>
            )
        }
    },
    {
        field: "amount",
        headerName: "Total Amount",
        flex: 1,
        headerAlign: "left",
        align: "left",
    }
]

export const recentTransactionsData: GridRowsProp = [
    {
        id: 1,
        maskedPan: "5673********1234",
        description: "Camera Lens",
        orderID: "#123456",
        paymentRef: "#123456",
        cardProvider: "mastercard",
        amount: "NGN146,000"
    },
    {
        id: 2,
        maskedPan: "5673********1234",
        description: "Camera Lens",
        orderID: "#123456",
        paymentRef: "#123456",
        cardProvider: "visa",
        amount: "NGN146,000"
    },
    {
        id: 3,
        maskedPan: "5673********1234",
        description: "Camera Lens",
        orderID: "#123456",
        paymentRef: "#123456",
        cardProvider: "verve",
        amount: "NGN146,000"
    }
]


// export const usersListFields: GridColDef[] = [
//     {
//         field: "id",
//         headerName: "#",
//         align: "center",
//         headerAlign: "center",
//     },
//     {
//         field: "name",
//         headerName: "Name",
//         flex: 1,
//         headerAlign: "left",
//         align: "left",
//         renderCell: ({row: {firstName, lastName}}: { row: { firstName: string, lastName: string } }) => {
//             return (
//                 <div className={`rounded w-full flex justify-start items-center`}>
//                     <div className="ml-3">
//                         <p className="text-sm font-bold">{firstName} {lastName}</p>
//                     </div>
//                 </div>
//             )
//         },
//     },
//     {
//         field: "email",
//         headerName: "Email",
//         flex: 1,
//         headerAlign: "left",
//         align: "left",
//     },
//     {
//         field: "phone",
//         headerName: "Phone Number",
//         flex: 1,
//         headerAlign: "center",
//         align: "center",
//     },
//     {
//         field: "gender",
//         headerName: "Gender",
//         flex: 0.5,
//         headerAlign: "center",
//         align: "center",
//     },
//     {
//         field: "action",
//         headerName: "",
//         flex: 0.5,
//         headerAlign: "center",
//         align: "center",
//         cellClassName: "action",
//         renderCell: ({row: {id}}: { row: { id: number } }) => {
//             const [isDropDownActive, setIsDropDownActive] = useState(false)
//
//             return (
//                 <div className={`rounded w-full flex justify-center items-center relative`}>
//                     <BsThreeDots
//                         onClick={() => setIsDropDownActive(!isDropDownActive)}
//                         className="text-2xl cursor-pointer"
//                     />
//                     <div
//                         className={`absolute p-0 m-0 top-10 rounded-md bg-white backdrop-blur-sm z-50 inset-x-0 w-full shadow-xl`}>
//                         <ul className={`list-none px-2 text-xs font-nunito text-white flex-col gap-1 ${isDropDownActive ? "flex justify-center items-center" : "hidden"}`}>
//                             {/*TODO: Fetch this from an API or from an array*/}
//                             <li
//                                 onClick={() => {
//                                     console.log(id)
//                                     setIsDropDownActive(false)
//                                 }}
//                                 className="w-full p-1 flex justify-start items-center rounded-md cursor-pointer text-blue-600 bg-sky-400"
//                             >
//                                 <Image src={PenIcon} alt={"pen"} width={16} height={16}/>
//                                 <p className="ml-3 font-semibold">Edit</p>
//                             </li>
//                             <li
//                                 onClick={() => {
//
//                                     setIsDropDownActive(false)
//                                 }}
//                                 className="w-full p-1 flex justify-start items-center text-red rounded-md cursor-pointer z-50"
//                             >
//                                 <Trash className="w-4 h-4"/>
//                                 <p className="ml-3 font-semibold">Delete</p>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             )
//         },
//         sortable: false,
//         hideSortIcons: true,
//     }
// ]

// export const usersListData: GridRowsProp = [
//     {
//         id: 1,
//         firstName: "John",
//         lastName: "Doe",
//         portrait: "../public/assets/utils/cloud.png",
//         email: "omonigho.efeoghene@outlook.com",
//         phone: "08123456789",
//         gender: "male",
//         action: "edit"
//     },
//     {
//         id: 2,
//         firstName: "John",
//         lastName: "Doe",
//         portrait: "../public/assets/utils/cloud.png",
//         email: "omonigho.efeoghene@outlook.com",
//         phone: "08123456789",
//         gender: "male",
//         action: "edit"
//     }
// ]