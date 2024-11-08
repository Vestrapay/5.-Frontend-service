import {GridColDef, GridRowsProp} from "@mui/x-data-grid";
import {CardProviderProps} from "@types"
import {BsThreeDots} from "react-icons/bs";
import React, {useState} from "react";
import {Trash} from "react-huge-icons/bulk";
import Image from "next/image";
import {PenIcon} from "@reusables/images";
import CurrencyFormat from "react-currency-format";

export const recentTransactionsFields: GridColDef[] = [
    // {
    //     field: "id",
    //     headerName: "#",
    //     align: "center",
    //     headerAlign: "center",
    // },
    {
        field: "pan",
        headerName: "Masked PAN",
        flex: 1,
    },
    {
        field: "narration",
        headerName: "Description",
        flex: 1,
        cellClassName: "description",
        headerAlign: "left",
        align: "left",
    },
    {
        field: "uuid",
        headerName: "Txn ID",
        flex: 1,
    },
    
    {
        field: "transactionReference",
        headerName: "Payment Ref",
        flex: 1,
    },
    {
        field: "transactionStatus",
        headerName: "Status",
        flex: 1,
    },
    {
        field: "cardScheme",
        headerName: "Scheme",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: ({row: {cardScheme}}: { row: { cardScheme: CardProviderProps } }) => {
            return (
                <div
                    className={`rounded w-full flex justify-center items-center ${cardScheme?.toLowerCase() === "visa" ? "bg-violet-200" : cardScheme?.toLowerCase() === "mastercard" ? "bg-orange-500" : "bg-slate-500"}`}>
                    <p className={`text-sm font-bold uppercase ${cardScheme?.toLowerCase() === "visa" ? "text-violet-500" : cardScheme?.toLowerCase() === "mastercard" ? "text-red" : "text-black"}`}>{cardScheme?.toUpperCase()}</p>
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
        renderCell: ({row: {amount,currency}}: { row: { amount: CardProviderProps,currency:string } }) => {
            return (
                <CurrencyFormat value={amount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={currency+" "} />
            )
        }
    },
]

export const recentTransactionsData: GridRowsProp = [
    {
        id: 1,
        pan: "5673********1234",
        narration: "Camera Lens",
        uuid: "#123456",
        transactionReference: "#123456",
        cardScheme: "mastercard",
        amount: "NGN146,000"
    },
    {
        id: 2,
        pan: "5673********1234",
        narration: "Camera Lens",
        uuid: "#123456",
        transactionReference: "#123456",
        cardScheme: "visa",
        amount: "NGN146,000"
    },
]


export const paymentLinksFields: GridColDef[] = [
    {
        field: "id",
        headerName: "#",
        align: "center",
        headerAlign: "center",
    },
    {
        field: "path",
        headerName: "Payment Link ID",
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
        field: "transactionId",
        headerName: "Transaction ID",
        flex: 1,
    },
    
    {
        field: "invoiceId",
        headerName: "Invoice ID",
        flex: 1,
    },
    {
        field: "customerName",
        headerName: "Customer Name",
        flex: 1,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
    },
    {
        field: "amount",
        headerName: "Total Amount",
        flex: 1,
        headerAlign: "left",
        align: "left",
        renderCell: ({row: {amount,currency}}: { row: { amount: CardProviderProps,currency:string } }) => {
            return (
                <CurrencyFormat value={amount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={currency+" "} />
            )
        }
    }
]