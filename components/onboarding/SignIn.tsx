import React from 'react';
import {DefaultButton, DefaultInput} from "@/components/reusables";

const SignIn = () => {
    return (
        <div className=" flex flex-col justify-center items-center w-full px-10 ">
            <p className="top-[0px] left-[0px] font-semibold inline-block w-[94px] h-7 text-[25px] font-nunito">
                Log In
            </p>
            <img
                className="mb-10 w-full h-px"
                alt=""
                src="/or.svg"
            />

            <DefaultInput
                type="email"
                name="phoneNumber"
                label="Email Address"
                topLabel="Email Address"
                placeHolder="Enter Email Address"
                containerVariant="w-full py-2"
                // value={pin}
                // handleChange={handleChange}
            />

            <DefaultInput
                type="password"
                name="password"
                label="Password"
                topLabel="Password"
                placeHolder="Enter Password"
                containerVariant="w-full py-2"
                // value={pin}
                // handleChange={handleChange}
            />

            <div className="flex items-center w-full my-6 justify-between">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                    <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                        Remember Me
                    </label>
                </div>
                <button className="text-blue-500 border-none bg-transparent font-nunito">
                    Reset Password?
                </button>
            </div>
            <DefaultButton
                labelText="Log in"
                // isLoading={isSubmitting}
                // handleClick={handelSubmit}
            />
            <p className="text-sm font-300 text-blackish mt-4">
                Don't have an account yet?
                <span className="text-blue-500 cursor-pointer ml-2">New Account</span>
            </p>
        </div>
    );
};

export default SignIn;