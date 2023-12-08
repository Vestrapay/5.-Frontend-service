import React from 'react';
import { DefaultButton, DefaultInput } from "@/components/reusables";

const ChangePassword = ({ setPage }: any) => {
    return (
        <div className='w-2/3'>

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
                labelText="Change Password"
                containerVariant="w-full"
                variant="w-full"
            // isLoading={isSubmitting}
            // handleClick={handleSubmit}
            />

            <div className="flex items-start my-6">
                <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish text-center w-full">
                    Back to <span className="text-darkslateblue" onClick={() => setPage("signin")} >Login</span>
                </label>
            </div>

        </div>
    );
};

export default ChangePassword;