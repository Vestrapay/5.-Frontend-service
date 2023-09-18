import React, {useEffect} from "react";
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Head from "next/head"
import NProgress from "nprogress";

import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import router from "next/router";
import {Toaster} from "react-hot-toast";
import {Context} from "@context";
import {Logo, LogoIcon} from "@public/assets";

export default function App({Component, pageProps}: AppProps) {

    const [queryClient] = React.useState(() => new QueryClient());

    useEffect(() => {
        router.events.on("routeChangeStart", NProgress.start);
        router.events.on("routeChangeComplete", NProgress.done);
        router.events.on("routeChangeError", NProgress.done);
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off("routeChangeStart", NProgress.done);
            router.events.off("routeChangeComplete", NProgress.done);
            router.events.off("routeChangeError", NProgress.done);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Head>
                <title>vestrapay</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link rel="icon" type="image/png" href="../public/assets/logo/vestra.png" sizes="32x32"/>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                />
            </Head>
            <Context>
                <Toaster/>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false}/>
            </Context>
        </QueryClientProvider>
    )
}
