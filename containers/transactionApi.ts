
import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect, useRef, useState } from 'react';
import router from 'next/router';


//Fetching transaction list data 
const fetchUsersData = (search: string) => {

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "dashboardTrans", //"getTransactions",
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

const TransactionController = (search: string = "") => {
    
    //showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, 

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchUsersData(search);

    useEffect(() => {
        refetch()
    }, [search])

    return { isLoading, isError, error, isSuccess, data, refetch }

}

export { TransactionController }