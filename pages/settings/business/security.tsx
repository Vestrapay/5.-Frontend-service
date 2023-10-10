import React from 'react';
import SettingsProfileLayout from "@pages/settings";
import { businessNavLinks } from "@pages/settings/business/index";
import Image from "next/image";
import { Camera } from "react-huge-icons/solid";
import { DefaultButton, DefaultInput, DefaultSelect } from "@reusables/index";
import { AboutBusinessController } from 'containers/settingsApi';

const Notifications = () => {

    const { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues, file, fileInputRef, handleFileInputClick, handleChangeFile } = AboutBusinessController()


    return (
        <SettingsProfileLayout navLinks={businessNavLinks} pageName={"Business"}>
            <form
                className="flex flex-col w-full"
            >
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-10 w-full">

                    <div className="flex flex-col gap-5 col-span-2">
                        <p className="text-black text-xl font-normal font-['Nunito']">Security</p>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="twoFAlogin" type="checkbox"
                                    name="twoFAlogin"
                                    // disabled={true}
                                    checked={stateValues?.twoFAlogin}
                                    onChange={() => handleExtraChange("twoFAlogin", !stateValues?.twoFAlogin)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Two factor authentication for login</span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Require two factor authentication everytime you login.</span>
                            </div>
                        </div>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="twoFAForTransfer" type="checkbox"
                                    name="twoFAForTransfer"
                                    checked={stateValues?.twoFAForTransfer}
                                    onChange={() => handleExtraChange("twoFAForTransfer", !stateValues?.twoFAForTransfer)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Two factor authentication for transfers </span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Get an OTP via SMS & Email every time a transfer is initiated.</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 col-span-2">
                        <p className="text-black text-xl font-normal font-['Nunito']">Transfer preferences</p>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="transfersViaAPI" type="checkbox"
                                    name="transfersViaAPI"
                                    checked={stateValues?.transfersViaAPI}
                                    onChange={() => handleExtraChange("transfersViaAPI", !stateValues?.transfersViaAPI)}
                                    className="w-4 h-4 border rounded-full border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Enable Transfers via API only.</span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Transfers would only be processed via API.</span>
                            </div>
                        </div>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="transfersViaDashboard" type="checkbox"
                                    name="transfersViaDashboard"
                                    checked={stateValues?.transfersViaDashboard}
                                    onChange={() => handleExtraChange("transfersViaDashboard", !stateValues?.transfersViaDashboard)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Enable Transfers via API and Dashboard.</span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Transfers would be processed from both API's and dashboard.</span>
                            </div>
                        </div>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="disableAllTransfers" type="checkbox"
                                    name="disableAllTransfers"
                                    checked={stateValues?.disableAllTransfers}
                                    onChange={() => handleExtraChange("disableAllTransfers", !stateValues?.disableAllTransfers)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Disable all transfers.</span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Transfer would be disabled from both API's and dashboard.</span>
                            </div>
                        </div>
                    </div>


                    <DefaultButton
                        labelText="Update"
                        isLoading={stateValues?.isSubmitting}
                        handleClick={handleSubmit}
                        variant={"bg-selected cursor-pointer w-1/2"}
                    />

                </div>
            </form>
        </SettingsProfileLayout>
    );
};

export default Notifications;