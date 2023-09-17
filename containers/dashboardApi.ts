
import { apiCall } from '../Utils/URLs'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';

const fetchDashData = async (): Promise<any> => {

    const response = await apiCall({
        name: "dashboardStats",
        action: (): any => (["skip"]),
        errorAction: (): any => (["skip"])
    })
    return response;
}
  // const { isLoading: statsLoading, isError: statsErrorCheck, error: statsError, isSuccess: statSuccess, data: statData } = useQuery(
  //   ["DASHBOARD_DATA", "Dashstats"],
  //   () => fetchDashData(),
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );


  // const { data: dashBranchData } = useQuery(
  //   ["DASHBOARD_DATA", "topMerchants"],
  //   () => fetchDashBranchData(),
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );

export { fetchDashData };


  // const { isLoading: statsLoading, isError: statsErrorCheck, error: statsError, isSuccess: statSuccess, data: statData } = useQuery(
  //   ["DASHBOARD_DATA", "Dashstats"],
  //   () => fetchDashData(),
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );


  // const { data: dashBranchData } = useQuery(
  //   ["DASHBOARD_DATA", "topMerchants"],
  //   () => fetchDashBranchData(),
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );