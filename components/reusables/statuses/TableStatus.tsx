import React, { useState, useEffect } from 'react'
import { StatusBarType } from './types'

const TableStatus = ({ status, children, statusText }: StatusBarType) => {
    const [statusColor, setStatusColor] = useState('')

    function StatusStwitch() {
        switch (status) {
            case '1':
            case 'true':
            case true:
            case "ACTIVE":
            case "APPROVED":
            case "SETTLED":
            case "Enabled":
                return setStatusColor('bg-green-500 text-green-500')
                break;
            case '0':
            case "IN_ACTIVE":
            case "IN_ACTIVE":
            case "UN_SETTLED":
            case "UNSETTLED":
            case "Disabled":
                return setStatusColor('bg-red-500 text-red-500')
                break;
            case 'PENDING':
                return setStatusColor('bg-orange-250 text-orange-200')
                break;
            case 'false':
            case false:
                return setStatusColor('bg-gray-300 text-gray-300')
                break;
            case 'Not Paid':
            case 'NotPaid':
            case "DECLINED":
                return setStatusColor('bg-red-light text-red-100')
                break;
            case 'UnDelivered':
            case 'Un Delivered':
            case 'Not Delivered':
                return setStatusColor('bg-red-light text-red-100')
                break;
            default:
                return setStatusColor('bg-gray-lighter text-gray-100')
                break;
        }
    }

    useEffect(() => {
        StatusStwitch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    return (
        <>
            <div className={`flex items-center justify-center gap-2 cursor-pointer`}>
                <div className={`w-2.5 h-2.5 rounded-full ${statusColor}`}></div>
                <p className={`font-200 text-sm min-w-max py-2 opacity-75 ${" text-gray-200"}`}>{statusText || children || status}</p>
            </div>
        </>
    )
}


export default TableStatus;