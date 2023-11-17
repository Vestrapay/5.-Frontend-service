
import React, { useEffect, useState } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TransactionsNavbar from "@/components/transactions/TransactionsNavbar";
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiRef, useGridSelector } from "@mui/x-data-grid";
import { DefaultButton } from '@/components/reusables';
import { BsPlus } from 'react-icons/bs';
import router from 'next/router';
import StartTransaction from '@/components/payment/StartTransaction';
import { TransactionController } from 'containers/transactionApi';
import { Pagination } from '@mui/material';
import { paymentLinksFields, recentTransactionsFields } from '@utils/tableSchema';
import { paymentGatewayController } from 'containers/paymentGatewayApi';

const Transfer = () => {

    const { PaymentLinkList } = paymentGatewayController()

    const { isLoading, isError, error, isSuccess, data, refetch } = PaymentLinkList();

    const [showDelete, setShowDelete] = useState<any>(false);

    const [actualData, setShowActualData] = useState<any>([]);

    const apiRef = useGridApiRef()

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

    return (
        <>
            <DashboardLayout>

                <main className="relative flex flex-1 mt-5 flex-col px-10 pb-4 h-screen w-full overflow-x-visible transition-all duration-300 ease-in-out px-10 sm:px-12 pb-10 h-full">
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
                        <div className='my-10 '>
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
                        </div>
                    }
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