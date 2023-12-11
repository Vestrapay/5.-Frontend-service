
import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect, useRef, useState } from 'react';
import router from 'next/router';


//Fetching transaction list data 
const fetchTransData = (search: string) => {

    // name: userType === "ADMIN" ? "adminMerchantUserList" : "usersList";

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "getTransactions", //"getTransactions",
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["TRANSACTIONS_LIST_DATA", "stats", search], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const fetchAdminTransData = (pageNo: number, pageSize: number, search: string, search2: string) => {

    // pageNo: any, pageSize: any, search: string, show: any, state: any, setState: any, setShowDrop: any
    // name: userType === "ADMIN" ? "adminMerchantUserList" : "usersList"; 

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "getTransactions", //"getTransactions",
            data: {
                uuid: "",
                paymentType: "",
                vestraPayReference: "",
                providerReference: "",
                userId: "",
                merchantId: "",
                settlementStatus: "",
                providerName: "",
                transactionReference: search,
                transactionStatus: search2,
                pageNumber: pageNo || 0,
                pageSize: pageNo || 20,
            },
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["ADMIN_TRANSACTIONS_LIST_DATA", "stats", search], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const TransactionController = (search: string = "") => {

    //showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, 

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchTransData(search);

    useEffect(() => {
        refetch()
    }, [search])

    return { isLoading, isError, error, isSuccess, data, refetch }

}

const AdminTransactionController = (pageNo: number = 0, pageSize: number = 20, search: string = "", search2: string = "") => {

    //showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, 

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchAdminTransData(pageNo, pageSize, search, search2);

    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, search2])
    
    return { isLoading, isError, error, isSuccess, data, refetch }

}

export { TransactionController };