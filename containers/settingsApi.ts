
import { apiCall } from '../Utils/URLs'
import { useQuery } from 'react-query'
import { LoginErrorCard } from '../Utils/actions/error';
import { DefaultInput, DefaultButton } from "@/components/reusables";
import { Storage } from 'Utils/inAppstorage';
import { useEffect, useState } from 'react';
import router from 'next/router';

//Fetching Roles list data
const fetchAllRolesData = () => {

    const [rolesData, setRolesData] = useState([])

    const func = async (): Promise<any> => {

        const response = await apiCall({
            name: "getAllRoles",
            action: (res): any => { setRolesData(res?.respBody); return ["skip"] },
            errorAction: (): any => (["skip"])
        })
        return response;
    }

    useEffect(() => {
        func()
    }, [])

    return { rolesData }
}

//Fetching accounts list data
const fetchAllBanksData = () => {

    const [banksData, setData] = useState([])

    const func = async (): Promise<any> => {

        const response = await apiCall({
            name: "getAllBanks",
            action: (res): any => { setData(res?.respBody); return ["skip"] },
            errorAction: (): any => (["skip"])
        })
        return response;
    }

    useEffect(() => {
        func()
    }, [])

    return { banksData }
}

const resetPasswordController = (state: any, setState: any, showModal: any) => {

    const { submittingError, isDisabled, isSubmitting, errorMssg, currentPassword, password, confirmPassword } = state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            loginError: false
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            await apiCall({
                name: "changePassword",
                data: {
                    oldPassword: currentPassword,
                    newPassword: confirmPassword,
                },
                successDetails: {
                    title: "Password Reset Successful",
                    text: `Your Password has changed, please continue to login`,
                    icon: ""
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });
                    return [""]
                },
                errorAction: (err?: any) => {
                    setState({
                        ...state,
                        submittingError: true,
                        isSubmitting: false,
                        errorMssg: "Action failed, please try again"
                    })
                    return [];
                }
            })
                .then(async (res: any) => {
                    console.log(res)
                    if (res) {
                        showModal();
                        router.push("/");
                        setState({
                            ...state,
                            isSubmitting: false,
                            submittingError: false,
                            check: true,
                            errorMssg: ""
                        });
                    }
                })
        } catch (e) {
            console.log(e + " 'Caught Error.'");
        };
    }

    return {handleChange, handleSubmit}
}

export { fetchAllRolesData, fetchAllBanksData, resetPasswordController }