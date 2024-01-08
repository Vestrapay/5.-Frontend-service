import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import router, { useRouter } from 'next/router'
import { LightCloseIcon } from '../reusables/icons'

function OnBoardingLayout({ page, children }: any) {

    //Component state and life cycle declarations

    const router = useRouter()
    const { stage } = router.query

    const [route, setRoute] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("Sign Up");
    const [windowWidth, setWindowWidowWidth] = useState<number>(0);

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

    const findTitle = (page: string) => {
        switch (page) {
            case 'signin':
                return ("Sign In");
            case 'changepass':
                return ("Change Password");
            case 'reset':
                return ("Reset Password");
            case 'signup':
                return ("Sign Up");
            case 'createpass':
                return ("Create Password");
            case 'verifySignUp':
                return ("Verify Sign-Up");
            case 'verifySignIn':
                return ("Verify Sign-In");
            default:
                return ("Sign Up");
        }

    }


    return (

        <>

            <div className="relative bg-grayer w-full h-[100%] min-h-[100vh] overflow-y-auto text-left text-base text-text flex justify-center font-nunito">
                <div className="sm:w-2/3 lg:w-2/3 xl:w-2/4 w-full bg-white h-full py-10 px-5 flex flex-col items-center">
                    <div className=" flex flex-col justify-center items-center py-20 w-full">
                        <img
                            className="w-[92px] h-[92px]"
                            alt=""
                            src="/logo.svg"
                        />
                        <p className="top-[0px] left-[0px] font-semibold inline-block w-[100%] text-center h-7 text-[25px] font-nunito">
                            {findTitle(page) || ""}
                        </p>

                    </div>

                    <div className=" flex flex-col justify-center items-center w-full md:px-10 ">
                        <img
                            className="mb-10 w-full h-px"
                            alt=""
                            src="/or.svg"
                        />

                        {children}

                        <div className="text-gray-900 text-xs font-normal font-['Roboto'] leading-tight tracking-wide text-center mt-5">
                            <p>VestraPay &copy; {new Date().getFullYear()}</p>
                            <p className="text-indigo-700 p-0 font-normal">licenced by Central Bank of Nigeria</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OnBoardingLayout;