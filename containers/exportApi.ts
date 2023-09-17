
import { apiCall } from '../Utils/URLs'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';

const exportData = async (url: string, params: any): Promise<any> => {

    const { email } = Storage.getItem("merchantDetails") || { email: "" }
    const response = await apiCall({
        name: url,
        params: {
            ...params,
            isExport: "true"
        },
        successDetails: { title: "Successful!", text: `A detailed report of your export has been sent to your ${email ? "email address " + email : ""} `, icon: "" },
        action: (): any => ([]),
        errorAction: (): any => (["skip"])
    })
    return response;
}

export { exportData };