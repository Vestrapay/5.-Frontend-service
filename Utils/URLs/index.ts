import axios from "axios";
import { urlPropTypes } from "../types";
import { endPoints } from './apiLib'
// import errorAlert from '../../actions/error'
// import successAlert from '../../actions/success'
import errorHandler from '../Functions/errorHandler'
import successAlert from "Utils/actions/success";
import { Storage } from "Utils/inAppstorage";



const baseUrl = (): any => "https://42661c368c60.ngrok.app";//process.env.REACT_APP_BASE_URL;
const paymentUrl= (): any => "https://dd52a73cb86e.ngrok.app";//process.env.REACT_APP_BASE_URL;

// For testing purposes only
export const _set_root_url = (newUrl: any): any => newUrl


/**
 * All data returned by the following functions follow the format
 *  {
 *      statusCode: String,
 *      data: any,
 *      message: String,
 *      errs: Object
 *  }
 */


export const apiCall = async ({ urlExtra, name, data = {}, params = {}, action = () => undefined, errorAction = () => undefined,
    successDetails = { title: "", text: "", icon: "" }, customHeaders = {} }: urlPropTypes) => new Promise(async (res, rej) => {

        let theName = name as keyof typeof endPoints
        let userDetails: any = Storage?.getItem('userDetails') || '{}'
        let { token } = userDetails || { token: "" }

        let headers: any = endPoints[theName] ? endPoints[theName].headers ? endPoints[theName].headers : {} : {}

        let useUrl: any = endPoints[theName] ? endPoints[theName].payment ? paymentUrl() : baseUrl() : baseUrl()

        if (endPoints[theName].auth) headers['Authorization'] = `Bearer ${token}`

        const response = await axios({
            url: `${useUrl}${endPoints[theName] ? endPoints[theName].url : ""}${urlExtra ? urlExtra : ""}`,
            method: endPoints[theName] ? endPoints[theName].method : "",
            headers: endPoints[theName] ? { ...customHeaders, ...endPoints[theName].headers } : { ...customHeaders },
            responseType: endPoints[theName] ? endPoints[theName]?.responseType || "json" : "json",
            data,
            params
        })
            .then(async r => {
                const returned = await action(r.data, r)

                if ((r.data.statusCode === 201 || r.data.statusCode === 200 || r.status === 200 || r.status === 201 || r.status === 204) && !returned?.includes("skip")) {
                    successAlert(successDetails, r.data)
                    r?.data?.data ? res(r.data.data) : res(r.data)
                } else if (r.data.statusCode === "00" || r.status === 200 || r.status === 201 || r.status === 204) {
                    r?.data?.data ? res(r.data.data) : res(r.data)
                }
                else if (r.data.statusCode !== "00" && r.status !== 200 && r.status !== 201 || r.status === 204) {
                    errorHandler(r)
                } else if (returned?.includes("push")) {
                    successAlert(successDetails, r.data)
                } else {
                    console.log("Response Error 1:", r)
                }
            })
            .catch(async err => {
                const returned = await errorAction(err)

                if (!returned?.includes("skip")) {
                    console.log("Response Error 2:", err)
                    errorHandler(err)
                    // rej(err)
                    return err
                } else {
                    console.log("Response Error 3:")
                    // rej(err);
                    return err
                }
            });

        return response;
    });