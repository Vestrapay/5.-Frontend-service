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
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 w-full">

                    <div className="flex flex-col gap-5 col-span-2">
                        <p className="text-black text-xl font-normal font-['Nunito']">Transaction notifications</p>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="emailNotification" type="checkbox"
                                    name="emailNotification"
                                    checked={stateValues?.emailNotification}
                                    onChange={() => handleExtraChange("emailNotification", !stateValues?.emailNotification)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Transaction emails  </span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Notify me for every transaction.</span>
                            </div>
                        </div>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="customerNotification" type="checkbox"
                                    name="customerNotification"
                                    checked={stateValues?.customerNotification}
                                    onChange={() => handleExtraChange("customerNotification", !stateValues?.customerNotification)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Customer receipt</span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Email my customers for every transaction.</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 col-span-2">
                        <p className="text-black text-xl font-normal font-['Nunito']">Card creation and termination</p>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="emailNotification" type="checkbox"
                                    name="emailNotification" disabled={true}
                                    // checked={stateValues?.emailNotification}
                                    // onChange={() => handleExtraChange("emailNotification", !stateValues?.emailNotification)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Card creation and termination</span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Notify me for every time a new card is created or terminated</span>
                            </div>
                        </div>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="creditNotifications" type="checkbox"
                                    name="creditNotifications" disabled={true}
                                    // checked={stateValues?.creditNotifications}
                                    // onChange={() => handleExtraChange("creditNotifications", !stateValues?.creditNotifications)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Card transactions</span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Notify me of all card transactions including card withdrawals, payments, and funding.</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 col-span-2">
                        <p className="text-black text-xl font-normal font-['Nunito']">Transfer notifications</p>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="emailNotification" type="checkbox"
                                    name="emailNotification"
                                    disabled={true}
                                    // checked={stateValues?.emailNotification}
                                    // onChange={() => handleExtraChange("emailNotification", !stateValues?.emailNotification)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Debit emails</span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Notify me for every transfer from my account.</span>
                            </div>
                        </div>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="creditNotifications" type="checkbox"
                                    name="creditNotifications"
                                    checked={stateValues?.creditNotifications}
                                    onChange={() => handleExtraChange("creditNotifications", !stateValues?.creditNotifications)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Credit emails</span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Notify me for every transfer from my account.</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 col-span-2">
                        <p className="text-black text-xl font-normal font-['Nunito']">Transaction notifications preferences</p>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="notifyOnlyBusinessEmail" type="checkbox"
                                    name="notifyOnlyBusinessEmail"
                                    checked={stateValues?.notifyOnlyBusinessEmail}
                                    onChange={() => handleExtraChange("notifyOnlyBusinessEmail", !stateValues?.notifyOnlyBusinessEmail)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Send to the business email address only</span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Notify me for every transaction.</span>
                            </div>
                        </div>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="notifyDashboardUsers" type="checkbox"
                                    name="notifyDashboardUsers"
                                    checked={stateValues?.notifyDashboardUsers}
                                    onChange={() => handleExtraChange("notifyDashboardUsers", !stateValues?.notifyDashboardUsers)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Send to all dashboard users</span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">1 dashboard users</span>
                            </div>
                        </div>
                        <div className="w-fit h-9 flex items-center gap-5">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="notifyDashboardUsers" type="checkbox"
                                    name="notifyDashboardUsers"
                                    checked={stateValues?.notifyDashboardUsers}
                                    onChange={() => handleExtraChange("notifyDashboardUsers", !stateValues?.notifyDashboardUsers)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">Send to specific users only</span>
                                <span className="text-neutral-600 text-base font-light font-['Nunito']">Select specific users</span>
                            </div>
                        </div>
                    </div>

                    {/* <div className="flex flex-col col-span-2">
                        <h4 className="m-0">How do you want to get your earnings?</h4>
                        <div className="flex items-start mt-2">
                            <div className="flex items-center rounded-full h-5">
                                <input id="customerPayTransactionFee" type="checkbox"
                                    name="customerPayTransactionFee"
                                    checked={stateValues?.customerPayTransactionFee}
                                    onChange={() => handleExtraChange("customerPayTransactionFee", true)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                    required />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                                Settle to my bank account
                            </label>
                        </div>
                        <div className="flex items-start mt-2">
                            <div className="flex items-center rounded-full h-5">
                                <input id="customerPayTransactionFee" type="checkbox"
                                    name="customerPayTransactionFee"
                                    checked={stateValues?.customerPayTransactionFee}
                                    onChange={() => handleExtraChange("customerPayTransactionFee", true)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                    required />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                                Settle to my payout balance
                            </label>
                        </div>
                    </div> */}

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