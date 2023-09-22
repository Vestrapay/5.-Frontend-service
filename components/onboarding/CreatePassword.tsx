import React from 'react';
import { DefaultButton, DefaultInput } from "@/components/reusables";
import { ResetedPasswordController } from 'containers/onboardingApi';
import { LoginErrorCard } from '@Utils/actions/error';

const ChangePassword = ({ setPage }: any) => {

    const { stateValues, handleChange, handelSubmit, handleClearError } = ResetedPasswordController(setPage);

    const { submittingError, isDisabled, isSubmitting, errorMssg, oldPassword, password, confirmPassword } = stateValues || {};

    return (
        <div className="w-full">

            <DefaultInput
                type="password"
                name="oldPassword"
                label="Temporary Password"
                topLabel="Temporary Password"
                placeHolder="Enter Temporary Password"
                containerVariant="w-full py-2"
                value={oldPassword}
                handleChange={handleChange}
            />

            <DefaultInput
                type="password"
                name="password"
                label="Confirm New Password"
                topLabel="Confirm New Password"
                placeHolder="Confirm New Password"
                containerVariant="w-full py-2"
                value={password}
                handleChange={handleChange}
                validate={true}
            />

            <DefaultInput
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                topLabel="Confirm Password"
                placeHolder="Enter Confirm Password"
                containerVariant="w-full py-2"
                value={confirmPassword}
                handleChange={handleChange}
                validate={true}
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


            <div className=" flex flex-col-reverse gap-5 sm sm:flex-row justify-between items-center">
                <DefaultButton
                    labelText="Create Password"
                    containerVariant="w-full my-5"
                    variant="w-full"
                    isLoading={isSubmitting}
                    handleClick={handelSubmit}
                    isDisabled={isDisabled}
                /></div>

            <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""} containerVariant={!stateValues?.submittingError ? "hidden" : ""} />

            <div className="flex items-start my-6">
                <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish text-center w-full">
                    Back to <span className="text-darkslateblue" onClick={() => setPage("signin")} >Login</span>
                </label>
            </div>

        </div>
    );
};

export default ChangePassword;