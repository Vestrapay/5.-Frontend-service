import React, { useState, useEffect } from 'react'
import { StatusBarType } from './types'

const ResponseStatus = ({ status, children, statusText }: StatusBarType) => {
    const [statusColor, setStatusColor] = useState('');
    const [statText, setStatText] = useState('')

    function StatusStwitch() {
        switch (true) {
            case (status === '00'):
            case (status === "ACTIVE"):
            case (status === "APPROVED"):
                return setStatusColor('bg-green-500 text-green-500')
                break;
            case (status > '0' && status < "95"):
            case (status === "IN_ACTIVE"):
            case (status === "IN_ACTIVE"):
                return setStatusColor('bg-orange-500 text-red-500')
                break;
            case (status === '96'):
            case (status === 'Not Paid'):
            case (status === "DECLINED"):
                return setStatusColor('bg-red-500 text-red-100')
                break;
            default:
                return setStatusColor('bg-gray-lighter text-gray-100')
                break;
        }
    }

    function StatusName() {
        switch (status) {
            case "00": return "Approved or completed successfully."; break;
            case "01": return "Refer to card issuer."; break;
            case "02": return "Refer to card issuers special conditions"; break;
            case "03": return "Invalid merchant."; break;
            case "04": return "Pick-up card."; break;
            case "05": return "Do not honour. "; break;
            case "06": return "Error"; break;
            case "07": return "Pick-up card, special condition"; break;
            case "08": return "Honor with identification."; break;
            case "09": return "Request in progress"; break;
            case "10": return "Approved for partial amount"; break;
            case "11": return "Approved VIP"; break;
            case "12": return "Invalid transaction."; break;
            case "13": return "Invalid amount"; break;
            case "14": return "Invalid card number (no such number)."; break;
            case "15": return "No such issuer"; break;
            case "16": return "Approved, update Track"; break;
            case "17": return "Customer cancellation."; break;
            case "18": return "Customer dispute"; break;
            case "19": return "Re-enter transaction"; break;
            case "20": return "Invalid response"; break;
            case "21": return "No action taken"; break;
            case "22": return "Suspected malfunction. "; break;
            case "23": return "Unacceptable transaction fee"; break;
            case "24": return "File update not supported by receiver"; break;
            case "25": return "Unable to locate record on file"; break;
            case "30": return "Format error"; break;
            case "31": return "Bank not supported by switch"; break;
            case "32": return "Completed partially"; break;
            case "33": return "Expired card"; break;

            case "34": return "Suspected fraud. See Fraud Guard."; break;
            case "35": return "Card acceptor contact acquirer"; break;
            case "36": return "Restricted card"; break;
            case "37": return "Card acceptor call acquirer security"; break;
            case "38": return "Allowable PIN tries exceeded"; break;
            case "39": return "No credit account"; break;
            case "40": return "Request function not supported"; break;
            case "41": return "Lost card"; break;
            case "42": return "No universal account. "; break;
            case "43": return "Stolen card, pick up"; break;
            case "44": return "No investment account"; break;
            case "51": return "Not sufficient funds"; break;
            case "52": return "No cheque account"; break;
            case "53": return "No savings account"; break;
            case "54": return "Expired card. "; break;
            case "55": return "Incorrect PIN"; break;
            case "56": return "No card record"; break;
            case "57": return "Transaction not permitted to cardholder"; break;
            case "58": return "Transaction not permitted to terminal"; break;
            case "59": return "Suspected fraud"; break;
            case "60": return "Card acceptor contact acquirer"; break;
            case "61": return "Exceeds withdrawal amount limits."; break;
            case "62": return "Restricted card"; break;
            case "63": return "Security violation"; break;
            case "64": return "Original amount incorrect"; break;
            case "65": return "Exceeds withdrawal frequency limit"; break;
            case "66": return "Card acceptor call acquirers security department"; break;
            case "67": return "Hard capture"; break;
            case "68": return "Response received too late"; break;
            case "75": return "Allowable number of PIN tries exceeded"; break;
            case "90": return "Cutoff is in process"; break;
            case "91": return "Issuer or switch is inoperative."; break;
            case "92": return "Financial institution or intermediate network facility cannot be found for routing"; break;
            case "93": return "Transaction cannot be completed. Violation of law"; break;
            case "94": return "Duplicate transmission"; break;
            case "95": return "Reconcile error"; break;
            case "96": return "System malfunction"; break;
            default:
                return "No response"
                break;
        }
    }
    useEffect(() => {
        StatusStwitch()
        let text = StatusName();
        setStatText(text)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    return (
        <>
            <div className={`flex items-center justify-center gap-2 cursor-pointer`}>
                <div className={`w-2.5 h-2.5 rounded-full ${statusColor}`}></div>
                <p className={`font-200 text-sm min-w-max py-2 opacity-75 ${" text-gray-800 "}`}>{`${statusText} - ${statText || statusText || children || status}`}</p>
            </div>
        </>
    )
}


export default ResponseStatus;