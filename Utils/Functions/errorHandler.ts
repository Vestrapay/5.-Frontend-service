import React from 'react';
import errorAlert from 'Utils/actions/error';


export default function errorHandler(err: any) {
    console.log("err: ", err?.response)
    if (err && (err instanceof Object && !(err instanceof Array))) {
        if (err.response) {
            if (err?.response?.status == 400) {
                errorAlert({ title: err?.response?.data?.respBody?.error || err?.response?.data?.respDescription, text: err?.response?.data?.respBody?.error || err?.response?.data?.message || err?.response?.data?.respDescription, errors: err?.response?.data?.respBody || []})
            }
            else if (err?.response?.status == 500) {
                errorAlert({ title: err?.response?.data?.respBody?.error || "An error occured", text: err?.response?.data?.respBody?.error || err?.response?.data?.message || err?.response?.data?.respDescription, errors: err?.response?.data?.respBody || []})
            }
            else if (err?.response?.status == 502) {
                errorAlert({ title: err?.response?.data?.respBody?.error || "An error occured", text: err?.response?.data?.respBody?.error || err?.response?.data?.message || err?.response?.data?.respDescription, errors: err?.response?.data?.respBody || []})
            }
            else if (err?.response?.status == 401) {
                window.location.href.includes("/login") ? null : window.location.href = '/login'
            } else {
                errorAlert({ title: "An error occured", text: "Something went wrong, please try again later.", errors: err?.response?.data?.respBody || []})
                console.log("Non specific error caught 1 : ")
                console.log(err)
            }
        } else {
            errorAlert({ title: "An error occured", text: "Something went wrong, please try again later.", errors: err?.response?.data?.respBody || []})
            console.log("Non specific error caught 2 : ")
            console.log(err)
        }
    } else {
        errorAlert({ title: "An error occured", text: "Something went wrong, please try again later.", errors: err?.response?.data?.respBody || []})
        console.log("Non specific error caught 3 : ")
        console.log(err)
    }
}
