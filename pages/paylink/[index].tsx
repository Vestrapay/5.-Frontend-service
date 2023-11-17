import Loader from '@/components/layouts/Loader';
import { useNewTransContext } from 'context/transactionContext';
import router from 'next/router'
import React, { useEffect } from 'react'

export default function index() {

    const { payPath, setPayPath } = useNewTransContext()
    
    useEffect(() => {

        let routerUrl = router?.asPath?.split("/paylink/")[1]

        setPayPath(routerUrl || "");
        console.log(routerUrl || "");

        router.push(`/paylink/card`);//"/payment-gateway/card"
    })
    return <Loader />;
} 