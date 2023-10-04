import React from 'react';
import SettingsProfileLayout from "@pages/settings";
import {businessNavLinks} from "@pages/settings/business/index";
import Image from "next/image";
import {Camera} from "react-huge-icons/solid";
import {DefaultButton, DefaultInput, DefaultSelect} from "@reusables/index";

const About = () => {

    const handleSubmit = () => {}

    return (
        <SettingsProfileLayout navLinks={businessNavLinks} pageName={"Business"}>
            <form
                className="flex flex-col w-full"
            >
                <div className="grid grid-cols-4 gap-5 w-full">

                    <DefaultInput
                        type="text"
                        name="business-name"
                        label="Business Name"
                        topLabel="Business Name"
                        placeHolder="Update business name"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <DefaultInput
                        type="text"
                        name="business-address"
                        label="Business Address"
                        topLabel="Business Address"
                        placeHolder="Update business address"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <DefaultInput
                        type="text"
                        name="business-phone-number"
                        label="business phone number"
                        topLabel="Business Phone Number"
                        placeHolder="Update business phone number"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <DefaultInput
                        type="text"
                        name="business-email-address"
                        label="business email address"
                        topLabel="Business Email Address"
                        placeHolder="Update business email address"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <DefaultInput
                        type="text"
                        name="support-phone-number"
                        label="support phone number"
                        topLabel="Support Phone Number"
                        placeHolder="Update support phone number"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <DefaultInput
                        type="text"
                        name="support-email-address"
                        label="support email address"
                        topLabel="Support Email Address"
                        placeHolder="Update support email address"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <DefaultSelect
                        name="country"
                        label="Country"
                        topLabel="Country"
                        containerVariant="w-full py-2 col-span-2"
                        data={[
                            {value: "Nigeria", name: "Nigeria"},
                            ]}
                    />

                    <DefaultInput
                        type="text"
                        name="chargeback-email-address"
                        label="chargeback email address"
                        topLabel="Chargeback Email Address"
                        placeHolder="Update chargeback email address"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <div className="flex flex-col col-span-2">
                        <h4 className="m-0">Who should pay the transaction fees?</h4>
                        <div className="flex items-start mt-2">
                            <div className="flex items-center rounded-full h-5">
                                <input id="remember" type="checkbox" value=""
                                       className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                       required/>
                            </div>
                            <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                                Make customers pay the transaction fees
                            </label>
                        </div>
                        <div className="flex items-start mt-2">
                            <div className="flex items-center rounded-full h-5">
                                <input id="remember" type="checkbox" value=""
                                       className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                       required/>
                            </div>
                            <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                                Charge me for the transaction fees
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <h4 className="m-0">How do you want to get your earnings?</h4>
                        <div className="flex items-start mt-2">
                            <div className="flex items-center rounded-full h-5">
                                <input id="remember" type="checkbox" value=""
                                       className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                       required/>
                            </div>
                            <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                                Settle to my bank account
                            </label>
                        </div>
                        <div className="flex items-start mt-2">
                            <div className="flex items-center rounded-full h-5">
                                <input id="remember" type="checkbox" value=""
                                       className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                       required/>
                            </div>
                            <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                                Settle to my payout balance
                            </label>
                        </div>
                    </div>
                    <DefaultButton
                        labelText={"Update"}
                        handleClick={handleSubmit}
                        variant={"bg-selected cursor-pointer w-full"}
                    />
                </div>
            </form>
        </SettingsProfileLayout>
    );
};

export default About;