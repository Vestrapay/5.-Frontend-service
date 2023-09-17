import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown';
import { FaArrowLeft } from 'react-icons/fa'
import { LoginErrorCard } from 'Utils/actions/error';
import { apiCall } from 'Utils/URLs';
import { OtpInput } from '../otpInput'
import { DefaultButton } from '../reusables';

function VerifyPassword({ setPage, passData, setPassData }: any) {
    console.log(setPassData);
    const [otp, setOtp] = useState('');
    const [clear, setClear] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(150);
    const [key, setKey] = useState(0);

    const [state, setState] = useState<any>({
        pin: "",
        confirmPin: "",
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        errorMssg: ""
    })

    // console.log(passData);

    const { submittingError, isDisabled, isSubmitting, errorMssg, pin } = state

    const handelSubmit = async (e: React.FormEvent) => {
        console.log(passData?.pin, otp);
        if (passData?.pin == otp) {
            setPage("reset")
        } else {
            setState({
                ...state,
                submittingError: true,
                isSubmitting: false,
                errorMssg: "Your OTP doesn't match."
            })
        }
    }

    const onChangeOTP = (value: string) => { setOtp(value); setState({ ...state, submittingError: false }) }

    const generateOtp = async (resent: any = false) => {
        await apiCall({
            name: "resetPassword",
            data: {
                username: passData?.email || "",
            },
            errorAction: (err?: any) => {
                if (err && err?.response?.data) {
                    setState({
                        ...state,
                        submittingError: true,
                        errorMssg: "Action failed, please try again"
                    })
                }
                return ["skip"];
            },
            successDetails: {
                title: "Successful",
                text: `Your OTP has been resent.`,
                icon: ""
            },
            action: (): any => resent ? [] : ["skip"]
        })
            .then(async (res: any) => {
                console.log(res)
                if (res) {
                    setPassData({
                        email: res?.phone,
                        pin: res?.code
                    });
                }
            })
    }

    useEffect(() => {
        let myPhoneInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myPhoneInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
            if (clear) { clearInterval(myPhoneInterval); setClear(false) }
            myPhoneInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myPhoneInterval)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }, 1000)
        }, 1000)
        return () => {
            clearInterval(myPhoneInterval);
        };
    }, [clear]);

    return (
        <div className=' flex justify-center'>
            <div className="max-w-[1000px] w-full md:w-2/3 h-2/3 flex flex-col items-center justify-center mt-16 md:mt-0 ">
                <div className="relative w-[98%] xs:w-5/6 h-full min-h-[75vh] bg-primary-white px-[2.5%] sm:px-[12%] py-12 sm:py-24 flex flex-col justify-between items-center border-sm border-primary-white rounded-xl my-10 backdrop-blur-lg bg-opacity-70 ">

                    <div className=" w-11/12 flex -ml-4 sm:-ml-10 lg:-ml-20 gap-2 sm:gap-5 lg:gap-10">
                        <button onClick={() => setPage("signin")} className=" h-full -ml-4 sm:-ml-6 lg:-ml-12 rounded-[50%] bg-whites-ghost p-4">
                            <FaArrowLeft className='text-primary-blue font-600' />
                        </button>
                        <div>
                            <p className=' w-fit text-2xl font-700 '>OTP Verification</p>
                            <p className='text-gray-400  w-fit text-base font-400 leading-7 mt-3'>Enter OTP sent to you</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-11/12">
                        <p className='w-fit text-base font-500 '>Enter OTP code below</p>
                        <OtpInput value={otp} valueLength={5} onChange={onChangeOTP} />
                        
                        <p className='w-fit text-base font-500 mt-3'>
                            {`Haven't recieved code? `}
                            <span
                                className={
                                    `text-primary-blue cursor-pointer 
                                ${key == 0.017 ? "opacity-100" : "opacity-50"}`}
                                onClick={
                                    key == 0.017 ?
                                        () => { generateOtp(true); setKey(Math.trunc(Math.random() * 10)) }
                                        : () => null
                                }>
                                Click to resend </span>
                            <Countdown
                                date={Date.now() + 150000}
                                intervalDelay={200}
                                precision={10}
                                onComplete={() => setKey(0.017)}
                                key={key}
                                renderer={props => <span className='text-gray-300'>{Math.trunc(props.total / 1000)}</span>}
                            />

                        </p>
                        
                    </div>
                    <LoginErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
                    <div className="flex flex-col items-center gap-8">

                        <DefaultButton
                            labelText="Continue"
                            isLoading={isSubmitting}
                            handleClick={handelSubmit}
                        />
                    </div>
                </div>
                <div className="text-gray-400  w-fit text-sm font-400 ">
                    <p>&#169; {`Medusa Virtual ${new Date().getFullYear()}`}</p>
                </div>

            </div>
        </div>
    )
}

export default VerifyPassword