import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import router, { useRouter } from 'next/router'
import { LightCloseIcon } from '../reusables/icons'

function OnBoardingLayout({ page, children }: any) {

    //Component state and life cycle declarations

    const router = useRouter()
    const { stage } = router.query

    const [route, setRoute] = useState<boolean>(false)
    const [windowWidth, setWindowWidowWidth] = useState<number>(0)

    useEffect(() => {
        if (page == 'signin') setRoute(true); else setRoute(false)

        setWindowWidowWidth(window.innerWidth)

        window.addEventListener('resize', () =>
            setWindowWidowWidth(window.innerWidth),
        )

        return () => {
            window.removeEventListener('resize', () =>
                setWindowWidowWidth(window.innerWidth),
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

    return (

        <>
            <div className="w-full min-h-[100vh] h-[100%] bg-slate-50">
                <div className="w-full min-h-[100vh] h-[100%] flex justify-center items-center">
                    <div className="w-1/3 h-screen bg-white">
                        <div className=" flex flex-col justify-center items-center pt-20 pb-10 w-full">
                            <img
                                className="w-[92px] h-[92px]"
                                alt=""
                                src="/logo.svg"
                            />
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OnBoardingLayout;