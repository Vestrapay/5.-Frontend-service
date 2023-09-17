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
            <div className=" w-full min-h-[100vh] h-[100%] bg-blue-darker login-bg">
                <div className=" w-full min-h-[100vh] h-[100%] bg-blue-darker">
                    {/* <div className=" relative h-full"> */}
                    <div className='flex absolute w-full top-[25px] justify-between left-0 sm:justify-between  sm:left-[0px] px-10 z-100 bg-blue-darker'>

                        <Image src={'/assets/svg/medusaLogo.svg'} alt="" width={120} height={100} />
                        {stage && <div className="cursor-pointer" onClick={() => router.push("/dashboard")}><LightCloseIcon /></div>}
                    </div>
                    
                    {/* </div> */}
                    <div className="h-[90%] py-10 ">
                        {children ||
                            <span></span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OnBoardingLayout;