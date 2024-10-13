import React from 'react';
import { DefaultButton, DefaultInput } from "@/components/reusables";
import type { NextPage } from "next";
import { SignInController } from 'containers/onboardingApi';
import { LoginErrorCard } from '@Utils/actions/error';

const SignIn = ({ setPage, resetingPass, setResetingPass, signInStatus, setPassData, passData }: any) => {
    
    const { stateValues, handleSubmit, handlePreLogin, handleChange, handleClearError } = SignInController(setPage, resetingPass, setResetingPass, signInStatus, passData, setPassData);

    const { email, password, loginError, loginErrorMssg, isLoggingIn } = stateValues
    console.log("getting current change status of state values",stateValues)

    return (
        <div className='md:w-2/3'>

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

            <DefaultInput
                type="password"
                name="password"
                label="Password"
                topLabel="Password"
                placeHolder="Enter Password"
                containerVariant="w-full py-2"
                value={password}
                noCheckPassword={true}
                handleChange={handleChange}
            />

            <div className="flex items-start sm:items-center w-full my-6 justify-between flex-col sm:flex-row gap-y-2">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                    <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                        Remember Me
                    </label>
                </div>
                <button className="text-darkslateblue border-none text-base bg-transparent font-nunito" onClick={() => setPage("reset")}>
                    Reset Password?
                </button>
            </div>
            
            <div className=" flex flex-col-reverse gap-5 sm sm:flex-row justify-between items-center">
                <DefaultButton
                    labelText="Log In"
                    containerVariant="w-full"
                    variant="w-full"
                    isLoading={isLoggingIn}
                    handleClick={handlePreLogin}
                />
            </div>

            <LoginErrorCard handleClear={handleClearError} error={stateValues?.loginErrorMssg || ""} containerVariant={!stateValues?.loginError ? "hidden" : ""} />

            <div className="flex items-start my-6">
                <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish text-center w-full">
                    Don't have an account yet? <span className="text-darkslateblue" onClick={() => setPage("signup")} >Sign Up</span>
                </label>
            </div>

        </div>
    );
};

export default SignIn;