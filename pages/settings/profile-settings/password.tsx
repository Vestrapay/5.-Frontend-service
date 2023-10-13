import React from 'react';
import SettingsProfileLayout from "@pages/settings/profile-settings";
import { DefaultButton, DefaultInput } from '@/components/reusables';
import { ResetedPasswordController } from 'containers/onboardingApi';
import { LoginErrorCard } from '@utils/actions/error';

const Password = () => {

    const { stateValues, handleChange, handelSubmit, handleClearError } = ResetedPasswordController((val: string) => null, (val: boolean) => null);

    const { submittingError, isDisabled, isSubmitting, errorMssg, oldPassword, password, confirmPassword } = stateValues || {};

    return (

        <SettingsProfileLayout>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 my-10 w-full">

                <DefaultInput
                    type="password"
                    name="oldPassword"
                    label="Old Password"
                    topLabel="Old Password"
                    placeHolder="Enter Old Password"
                    containerVariant="lg:w-1/2 min-w-max py-2 sm:col-span-3 col-span-2"
                    value={oldPassword}
                    handleChange={handleChange}
                />

                <DefaultInput
                    type="password"
                    name="password"
                    label="New Password"
                    topLabel="New Password"
                    placeHolder="Enter New Password"
                    containerVariant="lg:w-1/2 min-w-max py-2 sm:col-span-3 col-span-2"
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
                    containerVariant="lg:w-1/2 min-w-max py-2 sm:col-span-3 col-span-2"
                    value={confirmPassword}
                    handleChange={handleChange}
                    validate={true}
                />

                <p className="text-xs font-semibold w-full py-2 sm:col-span-3 col-span-2">
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

                <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""} containerVariant={!stateValues?.submittingError ? "hidden" : ""} />

                <DefaultButton
                    labelText="Change Password"
                    containerVariant="w-full py-2 sm:col-span-3 col-span-2 max-w-fit"
                    variant="w-full px-5"
                    isLoading={isSubmitting}
                    handleClick={handelSubmit}
                    isDisabled={isDisabled}
                />


            </div>
        </SettingsProfileLayout>
    );
};

export default Password;