import axios from "axios";
import { urlPropTypes } from "../types";
import { endPoints } from './apiLib'
// import errorAlert from '../../actions/error'
// import successAlert from '../../actions/success'
import errorHandler from '../Functions/errorHandler'
import successAlert from "Utils/actions/success";
import { Storage } from "Utils/inAppstorage";



const baseUrl = (): any => "https://879d-2001-569-52c4-d700-e0ec-3bbe-ac78-be3e.ngrok-free.app";//process.env.REACT_APP_BASE_URL;



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


export const apiCall = ({ urlExtra, name, data = {}, params = {}, action = () => undefined, errorAction = () => undefined, successDetails = { title: "", text: "", icon: "" } }: urlPropTypes) => new Promise((res, rej) => {

    let theName = name as keyof typeof endPoints
    let userDetails: any = Storage?.getItem('userDetails') || '{}'
    let { token } = userDetails || { token: "" }

    let headers: any = endPoints[theName] ? endPoints[theName].headers ? endPoints[theName].headers : {} : {}

    if (endPoints[theName].auth) headers['Authorization'] = `Bearer ${token}`

    axios({
        url: `${baseUrl()}${endPoints[theName] ? endPoints[theName].url : ""}${urlExtra ? urlExtra : ""}`,
        method: endPoints[theName] ? endPoints[theName].method : "",
        headers: endPoints[theName] ? endPoints[theName].headers : undefined,
        data,
        params
    })
        .then(async r => {
            const returned = await action(r.data)
            if ((r.data.statusCode === 201 || r.data.statusCode === 200) && !returned?.includes("skip")) {
                successAlert(successDetails, r.data)
                r?.data?.data ? res(r.data.data) : res(r.data)
            } else if (r.data.statusCode === "00" || r.status === 200 ||  r.status === 201) {
                r?.data?.data ? res(r.data.data) : res(r.data)
            }
            else if (r.data.statusCode !== "00" && r.status !== 200 &&  r.status !== 201) {
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
                rej(err);
                return err
            }
        });
});
