import React from 'react';
import { DefaultButton, DefaultInput } from "@/components/reusables";
import { OtpInput } from '../otpInput';
import { VerifySignInController } from 'containers/onboardingApi';
import Countdown from 'react-countdown';
import { LoginErrorCard } from '@Utils/actions/error';


const VerifySignIn = ({ setPage, passData }: any) => {


    const { stateValues, handleSubmit, onChangeOTP, timeVal, setKey, handleClearError, generateOtp } = VerifySignInController(setPage, passData)

    const {
        otp,
        clear,
        minutes,
        seconds,
        key,
    } = timeVal || {}

    const { submittingError, isDisabled, isSubmitting, errorMssg, pin, confirmPin } = stateValues
    console.log(otp);
    return (
        <div className='w-2/3'>

            <p className='w-fit text-base font-500 my-10'>Enter OTP code sent to your email and phone number below</p>

            <OtpInput value={otp} valueLength={6} onChange={onChangeOTP} />

            <p className='w-fit text-base font-500  my-10'>
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
                    date={Date.now() + 60000}
                    intervalDelay={200}
                    precision={10}
                    onComplete={() => setKey(0.017)}
                    key={key}
                    renderer={props => <span className='text-gray-300'>{Math.trunc(props.total / 1000)}</span>}
                />

            </p>
            <DefaultButton
                labelText="Verify"
                containerVariant="w-full my-5"
                variant="w-full"
                isLoading={isSubmitting}
                handleClick={handleSubmit}
            />

            <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""} containerVariant={!stateValues?.submittingError ? "hidden" : ""} />

            <div className="flex items-start my-6">
                <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish text-center w-full">
                    Back to <span className="text-darkslateblue" onClick={() => setPage("signin")} >Log In</span>
                </label>
            </div>

        </div >
    );
};

export default VerifySignIn;