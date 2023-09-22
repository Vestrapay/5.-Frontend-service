
import { useQuery } from 'react-query';
import { apiCall } from '../Utils/URLs'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';

const fetchDashData = () => {


  const func4 = async (): Promise<any> => {
    const response = await apiCall({
      name: "dashboardTrans",
      action: (): any => (["skip"]),
      errorAction: (): any => (["skip"])
    })
    return response;
  }

  const { isLoading: transLoading, isError: transErrorCheck, error: transError, isSuccess: transSuccess, data: transData } = useQuery(
    ["DASHBOARD_DATA", "transactions"],
    () => func4(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const func3 = async (): Promise<any> => {
    const response = await apiCall({
      name: "dashboardNotif",
      action: (): any => (["skip"]),
      errorAction: (): any => (["skip"])
    })
    return response;
  }

  const { isLoading: notifLoading, isError: notifErrorCheck, error: notifError, isSuccess: notifSuccess, data: notifData } = useQuery(
    ["DASHBOARD_DATA", "notification"],
    () => func3(),
    {
      refetchOnWindowFocus: false,
    }
  );


  const func1 = async (): Promise<any> => {
    const response = await apiCall({
      name: "dashboardStats",
      action: (): any => (["skip"]),
      errorAction: (): any => (["skip"])
    })
    return response;
  }

  const { isLoading: statsLoading, isError: statsErrorCheck, error: statsError, isSuccess: statSuccess, data: statData } = useQuery(
    ["DASHBOARD_DATA", "statistics"],
    () => func1(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const func2 = async (): Promise<any> => {
    const response = await apiCall({
      name: "dashboardAnalytics",
      action: (): any => (["skip"]),
      errorAction: (): any => (["skip"])
    })
    return response;
  }

  const { isLoading: lyticsLoading, isError: lyticsErrorCheck, error: lyticsError, isSuccess: lyticsSuccess, data: lyticsData } = useQuery(
    ["DASHBOARD_DATA", "analytics"],
    () => func2(),
    {
      refetchOnWindowFocus: false,
    }
  );


  return {
    statsLoading,
    statsErrorCheck,
    statsError,
    statSuccess,
    statData,

    lyticsLoading,
    lyticsErrorCheck,
    lyticsError,
    lyticsSuccess,
    lyticsData,

    notifLoading,
    notifErrorCheck,
    notifError,
    notifSuccess,
    notifData,

    transLoading,
    transErrorCheck,
    transError,
    transSuccess,
    transData,
  };
}



export { fetchDashData };
