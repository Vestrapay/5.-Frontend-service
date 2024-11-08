import React, { useState } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TransactionsNavbar from "@/components/transactions/TransactionsNavbar";
import { DataGrid, GridColDef, gridPageCountSelector, gridPageSelector, GridRowId, useGridApiRef, useGridSelector } from "@mui/x-data-grid";
import { DefaultButton, PoperDropDown } from '@/components/reusables';
import { BsPlus, BsFillEyeFill, BsThreeDots } from 'react-icons/bs';
import { recentTransactionsData, recentTransactionsFields } from "@Utils/tableSchema";
import Pagination from "@mui/material/Pagination";
import { CardProviderProps } from "@types";
import CurrencyFormat from 'react-currency-format';
import { TransactionController } from 'containers/transactionApi';
import TransactionDetails from '@/components/transactions/TransactionDetails';
import { useNewTransContext } from 'context/transactionContext';

const Refunds = () => {

    const { isLoading, isError, error, isSuccess, data, refetch } = TransactionController();
    const { isViewTrans, setIsViewTrans } = useNewTransContext()
    
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    })
    
    const apiRef = useGridApiRef();

    const [isDropDownActive, setIsDropDownActive] = useState(false);
    const [showDrop, setShowDrop] = useState<any>(false);
    const [selected, setSelected] = useState<number | string>("");
    const [selectedDetails, setSelectedDetails] = useState<| any>();

    const getRowData = (id: GridRowId) => {
        return apiRef.current?.getRow(id);
    }

    const Toolbar = () => {
        const page = useGridSelector(apiRef, gridPageSelector)
        const pageCount = useGridSelector(apiRef, gridPageCountSelector)

        return (
            <Pagination
                page={page + 1}
                count={pageCount}
                onChange={(event, value) => apiRef.current.setPage(value - 1)}
                color="standard"
            />
        )
    }

    const handleShowDrop = (id: number, off?: boolean) => {
        setShowDrop((prev: number) => off ? null : !prev ? id : (prev === id) ? null : id)
    };
    
    const recentTransactionsFields: GridColDef[] = [
        {
            field: "id",
            headerName: "#",
            align: "center",
            headerAlign: "center",
        },
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
            headerName: "Txn ID (UUID)",
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
            renderCell: ({ row: { cardScheme } }: { row: { cardScheme: CardProviderProps } }) => {
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
            renderCell: ({ row: { amount, currency } }: { row: { amount: CardProviderProps,currency:string } }) => {
                return (
                    <CurrencyFormat value={amount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={currency+" "} />
                )
            }
        },
        {
            field: "action",
            headerName: "",
            flex: 0.5,
            headerAlign: "center",
            align: "center",
            cellClassName: "action",
            renderCell: ({ row: { id, enabled } }: { row: { id: number, enabled: boolean } }) => {

                return (
                    <PoperDropDown
                        placeHolder="Sort by"
                        label=""
                        variant=' z-[1000]'
                        innerVariant="border-none py-1 h-fit rounded-xl outline-none focus:border font-normal z-[1000]"
                        containerVariant='w-max-content z-[1000]'
                        optionVariant="m-0 p-0 py-0"
                        optionContainerVariant={`right-7 absolute w-max bg-white h-fit z-500 shadow-md text-sm rounded-lg p-2.5 z-[1000]`}
                        onHandleChange={() => null}
                        checker={showDrop === id ? true : false}
                        list={true}
                        func={(off?: boolean) => {
                            handleShowDrop(id, off)
                        }}
                        value={""}
                        options={
                            ([
                                (<div key={1}
                                    className='h-10 flex items-center text-center p-2 px-4 py-4 my-2 my-2 gap-2 rounded-md cursor-pointer min-w-max text-slate-700 bg-slate-100 hover:bg-slate-200'
                                    onClick={() => {
                                        // Enable edit mode for the row
                                        console.log("View trans with id: ", id) //TODO: Edit the user with this id
                                        setIsDropDownActive(false)
                                        setIsViewTrans(true)
                                        setSelectedDetails(getRowData(id))
                                    }}>
                                    {/* onClick={() => showDeactivateModal(item?.id)}> */}
                                    <BsFillEyeFill className="w-4 h-4" /> <p
                                        className="w-full font-semibold text-left justify-start">View</p>
                                </div>)
                            ])}
                        optionHeight={"h-fit top-10 "}
                    >
                        <div className={`rounded w-full flex justify-center items-center relative z-0`}>
                            {(!showDrop || showDrop === id) ?
                                < BsThreeDots
                                    onClick={() => {
                                        setIsDropDownActive(!isDropDownActive)
                                        setSelected(id)
                                    }}
                                    className={`text-2xl cursor-pointer`}
                                /> : ""}
                        </div>
                    </PoperDropDown>
                )
            },
        }
    ]

    return (
        <DashboardLayout>
            <main className="relative flex flex-1 flex-col px-8 pb-4 h-[90%] w-full overflow-x-visible transition-all duration-300 ease-in-out px-10 sm:px-8 pb-10 h-full">

                <nav>
                <TransactionsNavbar buttonCheck={false} apiRef={apiRef} data={recentTransactionsData} name={"Refunds"} />
                </nav>
                {data && data?.length < 1 ?
                    <>
                        <div className="w-full lg:w-2/3 text-black text-lg sm:text-5xl font-bold font-['Nunito'] sm:p-5">
                            You do not have any refunds yet.
                        </div>
                        <div className="w-full lg:w-2/3 text-black text-base sm:text-xl font-bold font-['Nunito'] sm:p-5">
                            This is where you'll see the record of all your refunds to your customers.
                        </div>
                    </> : <DataGrid
                        rows={data || []}
                        columns={recentTransactionsFields}
                        disableRowSelectionOnClick={true}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        apiRef={apiRef}
                        // hideFooter={true}
                        slots={{
                            footer: Toolbar,
                        }}
                        getRowClassName={() => "transactions-table--row"}
                        sx={{
                            '&.MuiDataGrid-root .MuiDataGrid-row': {
                                backgroundColor: '#fff',
                                overflow: 'visible',
                                outline: "none !important",
                                "&:nth-of-type(odd)": {
                                    backgroundColor: "#FAFAFB",
                                },
                            },
                            "& .MuiDataGrid-main": {
                                fontFamily: "Nunito",
                                color: "#030229",
                                border: "none",
                                backgroundColor: "transparent",
                                overflow: "visible",

                            },
                            // "& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell": {
                            //     overflow: "visible",
                            //     // backgroundColor: "red",
                            // },
                            "& .MuiDataGrid-root": {
                                border: "none",
                                borderStyle: "none",
                                overflow: "visible",
                                width: "100%",
                            },
                            "& .MuiDataGrid-cell": {
                                border: "none",
                                // backgroundColor: "#b3b",
                            },
                            "& .MuiDataGrid-withBorderColor .MuiDataGrid-cell": {
                                border: "none",
                                overflow: "visible",
                            },
                            "& .MuiDataGrid-cellContent": {
                                border: "none",
                            },
                            "& .MuiDataGrid-columnsContainer": {
                                backgroundColor: "#fff",
                                border: "none",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                border: "none",
                                backgroundColor: "#fff",
                            },
                            "& .MuiPagination-root": {
                                border: "none",
                                marginTop: "10px",
                                display: "flex",
                                justifyContent: "end"
                            },
                            '&, [class^=MuiDataGrid]': {
                                border: 'none',
                            },
                            "& .MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                outline: "none !important",
                            },
                        }}
                    />}
                    <div
                        className={`w-full sm:w-2/3 xl:w-2/4 ${isViewTrans && selected ? "flex flex-col flex-nowrap" : "hidden"} absolute right-0 bg-white rounded-tl-xl rounded-bl-xl z-[2000] min-h-full p-5 shadow-xl transition-all duration-300 ease-in-out`}>
                        <TransactionDetails data={selectedDetails} />
                    </div>
            </main>
        </DashboardLayout>
    );
};

export default Refunds;
