import Loader from '@/components/layouts/Loader';
import router from 'next/router'
import React, { useEffect } from 'react'

export default function index() {

    useEffect(() => {
        router.push(`/paylink/card`)//"/payment-gateway/card"

        console.log(router.asPath)
    })


    return <Loader />;
}