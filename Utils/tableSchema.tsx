import {GridColDef, GridRowsProp} from "@mui/x-data-grid";
import {CardProviderProps} from "@types"

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
                <div className={`rounded w-full flex justify-center items-center ${cardProvider.toLowerCase() === "visa" ? "bg-violet-200" : cardProvider.toLowerCase() === "mastercard" ? "bg-orange-500" : "bg-slate-500"}`}>
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
    // {
    //     id: 1,
    //     maskedPan: "5673********1234",
    //     description: "Camera Lens",
    //     orderID: "#123456",
    //     paymentRef: "#123456",
    //     cardProvider: "mastercard",
    //     amount: "NGN146,000"
    // },
    // {
    //     id: 2,
    //     maskedPan: "5673********1234",
    //     description: "Camera Lens",
    //     orderID: "#123456",
    //     paymentRef: "#123456",
    //     cardProvider: "visa",
    //     amount: "NGN146,000"
    // },
    // {
    //     id: 3,
    //     maskedPan: "5673********1234",
    //     description: "Camera Lens",
    //     orderID: "#123456",
    //     paymentRef: "#123456",
    //     cardProvider: "verve",
    //     amount: "NGN146,000"
    // }
]