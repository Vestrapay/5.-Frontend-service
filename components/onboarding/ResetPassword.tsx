import React from 'react';
import { DefaultButton, DefaultInput } from "@/components/reusables";
import { ResetPasswordController } from 'containers/onboardingApi';
import { LoginErrorCard } from '@Utils/actions/error';

const ResetPassword = ({ setPage, setResetingPass }: any) => {

    const { stateValues, handleChange, handelSubmit, handleClearError } = ResetPasswordController(setPage, setResetingPass);

    const { submittingError, isDisabled, isSubmitting, errorMssg, pin, email } = stateValues || {};

    return (
        <div className="w-full ">
            <DefaultInput
                type="email"
                name="email"
                label="Email Address"
                topLabel="Email Address"
                placeHolder="Enter Email Address"
                containerVariant="w-full py-2"
                value={email}
                handleChange={handleChange}
            />
            
            <div className=" flex flex-col-reverse gap-5 sm sm:flex-row justify-between items-center">
                <DefaultButton
                    labelText="Reset Password"
                    containerVariant="w-full my-10"
                    variant="w-full"
                    isLoading={isSubmitting}
                    handleClick={handelSubmit}
                /></div>

            <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""} containerVariant={!stateValues?.submittingError ? "hidden" : ""} />

            <div className="flex items-start my-6">
                <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish text-center w-full">
                    Back to <span className="text-darkslateblue" onClick={() => setPage("signin")} >Log In</span>
                </label>
            </div>
        </div>
    );
};

export default ResetPassword;