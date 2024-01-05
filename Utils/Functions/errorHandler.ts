import React from 'react';
import errorAlert from 'Utils/actions/error';


export default function errorHandler(err: any) {
    console.log("err: ", err?.response)
    if (err && (err instanceof Object && !(err instanceof Array))) {
        if (err.response) {
            if (err?.response?.status == 400) {
                errorAlert({ title: err?.response?.data?.statusText || err?.response?.data?.message || "An error occured", text: err?.response?.data?.statusText || err?.response?.data?.message || err?.response?.data?.status, errors: err?.response?.data?.errors || [] })
            }
            else if (err?.response?.status == 500) {
                errorAlert({ title: err?.response?.data?.statusText || err?.response?.data?.message || "An error occured", text: err?.response?.data?.statusText || err?.response?.data?.message || err?.response?.data?.status, errors: err?.response?.data?.errors || [] })
            }
            else if (err?.response?.status == 502) {
                errorAlert({ title: err?.response?.data?.statusText || err?.response?.data?.message || "An error occured", text: err?.response?.data?.statusText || err?.response?.data?.message || err?.response?.data?.status, errors: err?.response?.data?.errors || [] })
            }
            else if (err?.response?.status == 4001) {
                window.location.href.includes("/login") ? null : window.location.href = '/login'
            } else {
                errorAlert({ title: "An error occured", text: "Something went wrong, please try again later.", errors: err?.response?.data?.errors || [] })
                console.log("Non specific error caught 1 : ")
                console.log(err)
            }
        } else {
            errorAlert({ title: "An error occured", text: "Something went wrong, please try again later.", errors: err?.response?.data?.errors || [] })
            console.log("Non specific error caught 2 : ")
            console.log(err)
        }
    } else {
        errorAlert({ title: "An error occured", text: "Something went wrong, please try again later.", errors: err?.response?.data?.errors || [] })
        console.log("Non specific error caught 3 : ")
        console.log(err)
    }
}
