import React, { useEffect, useState } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TransactionsNavbar from "@/components/transactions/TransactionsNavbar";
import { DataGrid, gridPageCountSelector, gridPageSelector, GridRowId, useGridApiRef, useGridSelector } from "@mui/x-data-grid";
import { DefaultButton, PoperDropDown } from '@/components/reusables';
import { BsFillEyeFill, BsPlus, BsThreeDots } from 'react-icons/bs';
import router from 'next/router';
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import StartTransaction from '@/components/payment/StartTransaction';
import { TransactionController } from 'containers/transactionApi';
import { Pagination } from '@mui/material';
import { paymentLinksFields, recentTransactionsFields } from '@utils/tableSchema';
import { paymentGatewayController } from 'containers/paymentGatewayApi';
import CurrencyFormat from 'react-currency-format';
import { CardProviderProps } from '@types';
import { useNewTransContext } from 'context/transactionContext';
import TransactionDetails from '@/components/transactions/TransactionDetails';

const Transfer = () => {

    const { PaymentLinkList } = paymentGatewayController()

    const { isLoading, isError, error, isSuccess, data, refetch } = PaymentLinkList();

    const { isViewTrans, setIsViewTrans } = useNewTransContext()

    const [isDropDownActive, setIsDropDownActive] = useState(false);
    const [showDrop, setShowDrop] = useState<any>(false);
    const [selected, setSelected] = useState<number | string>("");
    const [selectedDetails, setSelectedDetails] = useState<| any>();
    const [showDelete, setShowDelete] = useState<any>(false);

    const [actualData, setShowActualData] = useState<any>([]);

    const apiRef = useGridApiRef()

    const getRowData = (id: GridRowId) => {
        return apiRef.current?.getRow(id);
    }

    useEffect(() => {
        setShowActualData(data?.filter((each: any) => ({
            ...each, path: `${window && window?.location &&
                window?.location?.href?.split("/payment-gateway/payment-link")[0]}/paylink/${each?.path || ""}` || each?.path
        })))
    }, [data])

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    })

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


    const paymentLinksFields: GridColDef[] = [
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
            renderCell: ({ row: { amount } }: { row: { amount: CardProviderProps } }) => {
                return (
                    <CurrencyFormat value={amount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />
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
                                <BsThreeDots
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
        <>
            <DashboardLayout>

                <main className="relative flex flex-1 flex-col px-10 pb-4 h-[90vh] w-full overflow-x-visible transition-all duration-300 ease-in-out px-10 sm:px-8 pb-10 h-full">
                    <nav>
                        <TransactionsNavbar apiRef={apiRef} data={actualData} name="Payment Link" setShowDelete={() => setShowDelete(true)} />
                    </nav>
                    {actualData && actualData?.length < 1 ?
                        <>
                            <div className="w-full lg:w-2/3 text-black text-lg sm:text-5xl font-bold font-['Nunito'] sm:p-5">
                                Try out payment links
                            </div>
                            <div className="w-full lg:w-2/3 text-black text-base sm:text-xl font-bold font-['Nunito'] sm:p-5">
                                The best way to receive money from your clients.
                            </div>
                            <DefaultButton
                                icon={<BsPlus size={25} />}
                                labelText="Pay with Payment Links"
                                handleClick={setShowDelete}
                                variant={"bg-selected cursor-poNunito flex items-center p-0 min-w-max sm:m-5"}
                            />
                        </> :
                        <DataGrid
                            rows={actualData || []}
                            columns={paymentLinksFields}
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
                        />
                    }
                    <div
                        className={`w-full sm:w-2/3 xl:w-2/4 ${isViewTrans && selected ? "flex flex-col flex-nowrap" : "hidden"} absolute right-0 bg-white rounded-tl-xl rounded-bl-xl z-[2000] min-h-full p-5 shadow-xl transition-all duration-300 ease-in-out`}>
                        <TransactionDetails data={selectedDetails} />
                    </div>
                </main>
            </DashboardLayout>

            <StartTransaction
                show={showDelete}
                setShow={setShowDelete}
                data={"/payment-gateway/payment-link"}
            />
        </>
    );
};

export default Transfer;