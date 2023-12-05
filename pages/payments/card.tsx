
import React, { useEffect, useState } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TransactionsNavbar from "@/components/transactions/TransactionsNavbar";
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiRef, useGridSelector } from "@mui/x-data-grid";
import { DefaultButton } from '@/components/reusables';
import { BsPlus } from 'react-icons/bs';
import router from 'next/router';
import StartTransaction from '@/components/payment/StartTransaction';
import { Pagination } from '@mui/material';
import { TransactionController } from 'containers/transactionApi';
import { recentTransactionsFields } from '@utils/tableSchema';

const Card = () => {

    const { isLoading, isError, error, isSuccess, data, refetch } = TransactionController();

    const [showDelete, setShowDelete] = useState<any>(false);

    const [actualData, setShowActualData] = useState<any>([]);

    const apiRef = useGridApiRef()

    useEffect(() => {
        setShowActualData(data?.filter((each: any) => each.paymentType == "CARD"))
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

                <main className="relative flex flex-1 flex-col px-8 pb-4 h-screen w-full overflow-x-visible transition-all duration-300 ease-in-out px-10 sm:px-8 pb-10 h-full">
                    <nav>
                        <TransactionsNavbar apiRef={apiRef} data={actualData || []} name="Card" setShowDelete={() => setShowDelete(true)} />
                    </nav>
                    {actualData && actualData?.length < 1 ?
                        <>
                            <div className="w-full lg:w-2/3 text-black text-lg sm:text-5xl font-bold font-['Nunito'] sm:p-5">
                                With your Vestrapay card, you can make payments anywhere, globally and in any currency.
                            </div>
                            <DefaultButton
                                icon={<BsPlus size={25} />}
                                labelText="Pay with card"
                                handleClick={setShowDelete}
                                variant={"bg-selected cursor-poNunito flex items-center p-0 min-w-max sm:m-5"}
                            />
                        </> :
                        <div className='my-10 '>
                            <DataGrid
                                rows={actualData || []}
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
                            />
                        </div>
                    }
                </main>
            </DashboardLayout>

            <StartTransaction
                show={showDelete}
                setShow={setShowDelete}
                data={"/payment-gateway/card"}
            />
        </>
    );
};

export default Card;
