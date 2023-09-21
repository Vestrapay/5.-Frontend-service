import React from 'react';
import {DefaultButton, DefaultInput} from "@/components/reusables";

const ChangePassword = () => {
    return (
        <div className=" flex flex-col justify-center items-center w-full px-10 ">
            <p className="flex whitespace-nowrap justify-center font-semibold w-[94px] h-7 text-[25px] font-nunito">
                Change Password
            </p>
            <img
                className="mb-10 w-full h-px"
                alt=""
                src="/or.svg"
            />

            <DefaultInput
                type="password"
                name="New password"
                label="New Password"
                topLabel="New Password"
                placeHolder="Enter New Password"
                containerVariant="w-full py-2"
                // value={pin}
                // handleChange={handleChange}
            />

            <DefaultInput
                type="password"
                name="Confirm password"
                label="Confirm Password"
                topLabel="Confirm Password"
                placeHolder="Enter Confirm Password"
                containerVariant="w-full py-2"
                // value={pin}
                // handleChange={handleChange}
            />

            <p className="text-xs font-semibold">
                <span className="font-normal">
                    Characteristics of strong passwords:
                </span>
                <br />
                <br />
                At least 8 characters—the more characters, the better.
                <br />
                A mixture of both uppercase and lowercase letters.
                <br />
                A mixture of letters and numbers.
                <br />
                Inclusion of at least one special character, e.g., ! @ # ? [ ]
                <br />
                <br />
                <span className="font-normal">
                    Note: do not use &lt; or &gt; in your password, as both can cause
                problems in Web browsers.
                </span>
            </p>


            <DefaultButton
                labelText="Log in"
                // isLoading={isSubmitting}
                // handleClick={handelSubmit}
            />

        </div>
    );
};

export default ChangePassword;