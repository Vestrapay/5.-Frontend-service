
import React, { useEffect, useState } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TransactionsNavbar from "@/components/transactions/TransactionsNavbar";
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiRef, useGridSelector } from "@mui/x-data-grid";
import { recentTransactionsData, recentTransactionsFields } from "@Utils/tableSchema";
import Pagination from "@mui/material/Pagination";
import { TransactionController } from 'containers/transactionApi';
import { DefaultButton } from '@/components/reusables';
import { BsPlus } from 'react-icons/bs';

const Chargebacks = () => {

    const { isLoading, isError, error, isSuccess, data, refetch } = TransactionController();

    const apiRef = useGridApiRef()
    const [stateData, setStateData] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    })

    useEffect(() => {
        let newData = data?.filter((each: any) => each?.tranType == "CHARGEBACK");
        setStateData(newData || data)
    }, [data])


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
        <DashboardLayout>
            <main className="relative flex flex-1 flex-col px-8 pb-4 h-screen w-full overflow-x-visible transition-all duration-300 ease-in-out px-10 sm:px-8 pb-10 h-full">

                <nav>
                    <TransactionsNavbar apiRef={apiRef} data={data} name="Chargebacks" />
                </nav>
                {data && data?.length < 1 ?
                    <>
                        <div className="w-full lg:w-2/3 text-black text-lg sm:text-5xl font-bold font-['Nunito'] sm:p-5">
                            You do not have ny chargebacks to process at the moment.
                        </div>
                        <div className="w-full lg:w-2/3 text-black text-base sm:text-xl font-bold font-['Nunito'] sm:p-5">
                            Your customers might be looking for ways to pay you, create a payment link.
                        </div>
                        <DefaultButton
                            icon={<BsPlus size={25} />}
                            labelText="Create a payment link"
                            handleClick={() => null}
                            variant={"bg-selected cursor-poNunito flex items-center p-0 min-w-max sm:m-5"}
                        />
                    </> :
                    <DataGrid
                        rows={stateData || data || []}
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
                }
            </main>
        </DashboardLayout>
    );
};

export default Chargebacks;
