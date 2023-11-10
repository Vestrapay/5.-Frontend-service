import Loader from '@/components/layouts/Loader';
import router from 'next/router'
import React, { useEffect } from 'react'

export default function index() {

    useEffect(() => {
        router.replace("/payment-gateway/card")
    })

    return <Loader/>;
}
