import React from 'react';
import {DefaultButton, DefaultInput} from "@/components/reusables";

const ResetPassword = () => {
    return (
        <div className=" flex flex-col justify-center items-center w-full px-10 ">
            <p className="flex whitespace-nowrap justify-center font-semibold w-[94px] h-7 text-[25px] font-nunito">
                Reset Password
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

            <DefaultButton
                labelText="Reset Password"
                // isLoading={isSubmitting}
                // handleClick={handelSubmit}
            />
        </div>
    );
};

export default ResetPassword;