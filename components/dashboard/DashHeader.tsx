import React, { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { Storage } from 'Utils/inAppstorage'

function DashHeader({ data }: any) {

    const [displayName, setDisplayName] = useState("")

    const [displayNameSub, setDisplayNameSub] = useState("")

    const [accType, setAccType] = useState("")

    const [myId, setId] = useState("")

    const { name: merchantName } = data || {}

    const { name } = Storage.getItem("merchantDetails") || {}

    const { firstName, lastName, accountType, entity, merchantDetails } = Storage.getItem("userDetails") || { firstName: "", lastName: "", accountType: "" }

    useEffect(() => {
        setDisplayName(name || merchantName || "");
        setDisplayNameSub(`${firstName || ""} ${lastName || ""}`);
        setAccType(accountType || "");
        setId(entity?.referralCode);
    }, [name, merchantName, accountType, entity])

    return (
        <div className='w-full mb-6'>
            <div className='flex flex-col sm:flex-row sm:justify-between gap-y-5 sm:items-center'>
                <div>
                    <p className='text-black-midnight w-fit text-lg font-600 mt-3 text-primary-white'> Welcome Back,
                        <span className='text-gray-500 w-fit text-lg font-100'> {displayName || displayNameSub}</span>
                    </p>
                    <span className='text-gray-400 w-fit text-xs m-0 font-100'> {accType || ""} 
                        {`${myId?" ID : "+myId||"":""}`}</span>
                </div>
            </div>
        </div>
    )
}

export default DashHeader;