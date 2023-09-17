
import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect } from 'react';

//Fetching reports list data
const fetchSettlementListData = (pageNo: any, pageSize: any, search: string) => {

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "settlementList",
            params: {
                pageNo,
                pageSize,
            },
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["SETTLEMENT_LIST_DATA", "stats", pageNo], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const settlementListController = (pageNo: any, pageSize: any, search: string, show: any, state: any, setState: any, setShowDrop: any) => {

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchSettlementListData(pageNo, pageSize, search);

    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, show])

    const handleShowDrop = (id: number, off?: boolean) => {
        setShowDrop((prev: number) => off ? null : !prev ? id : (prev === id) ? null : id)
    }

    return { isLoading, isError, error, isSuccess, data, refetch, handleShowDrop }

}

const fetchTransListData = (pageNo: any, pageSize: any, search: string, search2: string) => {

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "transactionList",
            params: {
                pageNo,
                pageSize,
                institutionId: search,
                sessionId: search2
            },
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["TRANS_LIST_DATA", "stats", pageNo], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const transListController = (pageNo: any, pageSize: any, search: string, search2: string, show: any, state: any, setState: any, setShowDrop: any) => {

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchTransListData(pageNo, pageSize, search, search2);

    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, show])

    const handleShowDrop = (id: number, off?: boolean) => {
        setShowDrop((prev: number) => off ? null : !prev ? id : (prev === id) ? null : id)
    }

    return { isLoading, isError, error, isSuccess, data, refetch, handleShowDrop }

}

const fetchSettlementTransListData = (pageNo: any, pageSize: any, search: string, slug: string) => {

    const func = async (): Promise<any> => {
        const response = await apiCall({
            name: "settlementTransactionList",
            params: {
                pageNo,
                pageSize,
                cycleId: slug
            },
            action: (): any => (["skip"])
        })
        return response;
    }

    const { isLoading, isError, error, isSuccess, data, refetch } = useQuery(
        ["SETTLEMENT_TRANS_LIST_DATA", "stats", pageNo], () => func(),
        {
            refetchOnWindowFocus: false,
            // staleTime: 60000
        }
    );
    return { isLoading, isError, error, isSuccess, data, refetch }
}

const settlementTransListController = (pageNo: any, pageSize: any, search: string, show: any, state: any, setState: any, setShowDrop: any, slug: any) => {

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchSettlementTransListData(pageNo, pageSize, search, slug);

    useEffect(() => {
        refetch()
    }, [pageNo, pageSize, search, show])

    const handleShowDrop = (id: number, off?: boolean) => {
        setShowDrop((prev: number) => off ? null : !prev ? id : (prev === id) ? null : id)
    }

    return { isLoading, isError, error, isSuccess, data, refetch, handleShowDrop }

}

export { settlementListController, transListController, settlementTransListController }