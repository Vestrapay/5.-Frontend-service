import { apiCall } from '@utils/URLs'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react';
import { UserDetailProps } from '@types';
import { useAuthContext } from "../context/AuthContext";
import { Storage } from 'Utils/inAppstorage'


const fetchMerchantUsersData = (pageNo: any, pageSize: any, search: string) => {

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "adminMerchantUserList",
            action: (): any => (["skip"]),
            errorAction: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["MERCHANT_USER_LIST_DATA", "stats", pageNo], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}


const MerchantUsersController = (showDelete: any = false, showView: any = false, showCreate: any = false, pageNo: any = 0, pageSize: any = 20, search: string = "") => {

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchMerchantUsersData(pageNo, pageSize, search);
    console.log("fetchMerchantUsersData: inner") 
    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, showView, showCreate, showDelete])

    return { isLoading, isError, error, isSuccess, data, refetch }

}

export { MerchantUsersController, fetchMerchantUsersData }
