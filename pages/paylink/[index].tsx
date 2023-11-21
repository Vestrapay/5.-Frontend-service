import Loader from '@/components/layouts/Loader';
import { usePreviousRoute } from '@utils/hooks/usePreviousRoute';
import { useNewTransContext } from 'context/transactionContext';
import router from 'next/router'
import React, { useEffect } from 'react'
import Card from './card';
import Ussd from './ussd';
import Transfer from './transfer';
import PaymentLink from './payment-link';

export default function index() {

    const { payPath, setPayPath, payment } = useNewTransContext()

    const prevRoute = usePreviousRoute()

    useEffect(() => {

        let routerUrl = router?.asPath?.split("/paylink/")[1]

        if (!router?.asPath.includes("index") && !payPath) setPayPath(routerUrl || "");

        // router.push(`/paylink/card`);//"/payment-gateway/card"
    })

    switch (payment) {
        case 'card':
            return (<Card />);
        case 'ussd':
            return (<Ussd />);
        case 'transfer':
            return (<Transfer />);
        case 'payment-link':
            return (<PaymentLink />);
        default:
            return (<Card />);
    }

}