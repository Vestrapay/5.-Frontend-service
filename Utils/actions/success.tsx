
import React from "react";
import { notify } from "./toaster";
import { SmSuccessModalIcon } from "@/components/reusables/icons";


export default function successAlert(details: { title: any; text: any; icon: any; }, response: { data: any; errs: any; message: any; statusCode: any; }) {


    const { title, text, icon } = details || {}
    const { data, errs, message, statusCode } = response || {}

    return notify({ header: `${title ? title : "Successful!"}`, details: text ? text : message ? message : null, icon: <SmSuccessModalIcon /> })

    // let parsedData = !(data instanceof Object && !(data instanceof Array)) ? []
    //     :
    //     Object.keys(data).map((one, key) => {
    //         return {
    //             one: Object.keys(data)[key],
    //             two: Object.values(data)[key] ?
    //                 Array.isArray(Object.values(data)[key]) ?
    //                     Object.values(data)[key]?.join(', ')
    //                     :
    //                     (Object.values(data)[key] instanceof Object && !(Object.values(data)[key] instanceof Array)) ?
    //                         Object.values(Object.values(data)[key])?.join(', ')
    //                         : Object.values(data)[key]
    //                 : String(Object.values(data)[key])
    //         }
    //     })

    // swal.fire({
    //     title: `${title ? title : "Successful!"}`,
    //     icon: 'success',
    //     text: text ? text : message ? message : null,
    //     html: parsedData.length < 1 ? null :

    //         <MainTable
    //             paged={false}
    //             style={{ column: { minHeight: 0, background: '#1C2539' } }}
    //             data={{
    //                 head: ["Data", "Value"],
    //                 cells: parsedData
    //             }}
    //         />
    // })
}