import React from 'react';
import Image from "next/image";
import { Camera } from "react-huge-icons/solid";
import { DefaultButton, DefaultInput, DefaultSelect } from "@reusables/index";
import { CreateBusinessController } from 'containers/settingsApi';
import { LoginErrorCard } from '@utils/actions/error';
import router from 'next/router';
import { CountriesJson } from '@utils/helpers/CountriesJson';

const CreateBusiness = () => {

    const { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues, file, fileInputRef, handleFileInputClick, handleChangeFile } = CreateBusinessController()

    return (
        <main className="w-full h-max-content bg-dashboard 2xl:flex 2xl:flex-col 2xl:items-center">
            <div className=' w-full max-w-[1200px]'>
                <div className="flex animate__animated animate__fadeIn h-max-content bg-blue-darker items-start justify-start">

                    {/* Main */}
                    <div className="relative flex flex-col py-10 pb-4 h-screen w-full my-10  transition-all duration-300 ease-in-out px-10 sm:p-12 pb-10 h-full bg-white ">

                        <p className="text-ultraMarine text-2xl text-left">Create Business</p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full">

                            <DefaultInput
                                type="text"
                                name="businessName"
                                label="Business Name"
                                topLabel="Business Name"
                                placeHolder="Update business name"
                                containerVariant="w-full py-2 col-span-2"
                                value={stateValues?.businessName}
                                handleChange={handleChange}
                            />

                            <DefaultInput
                                type="text"
                                name="businessAddress"
                                label="Business Address"
                                topLabel="Business Address"
                                placeHolder="Update business address"
                                containerVariant="w-full py-2 col-span-2"
                                value={stateValues?.businessAddress}
                                handleChange={handleChange}
                            />

                            <DefaultInput
                                type="text"
                                name="businessPhoneNumber"
                                label="business phone number"
                                topLabel="Business Phone Number"
                                placeHolder="Update business phone number"
                                containerVariant="w-full py-2 col-span-2"
                                value={stateValues?.businessPhoneNumber}
                                handleChange={handleChange}
                            />

                            <DefaultInput
                                type="text"
                                name="businessEmail"
                                label="business email address"
                                topLabel="Business Email Address"
                                placeHolder="Update business email address"
                                containerVariant="w-full py-2 col-span-2"
                                value={stateValues?.businessEmail}
                                handleChange={handleChange}
                            />

                            <DefaultInput
                                type="text"
                                name="businessSupportPhoneNumber"
                                label="support phone number"
                                topLabel="Support Phone Number"
                                placeHolder="Update support phone number"
                                containerVariant="w-full py-2 col-span-2"
                                value={stateValues?.businessSupportPhoneNumber}
                                handleChange={handleChange}
                            />

                            <DefaultInput
                                type="text"
                                name="businessSupportEmailAddress"
                                label="support email address"
                                topLabel="Support Email Address"
                                placeHolder="Update support email address"
                                containerVariant="w-full py-2 col-span-2"
                                value={stateValues?.businessSupportEmailAddress}
                                handleChange={handleChange}
                            />

                            <DefaultSelect
                                name="country"
                                label="Country"
                                topLabel="Country"
                                containerVariant="w-full py-2 col-span-2"
                                data={CountriesJson}
                                handleChange={handleChange}
                            />

                            <DefaultInput
                                type="text"
                                name="chargeBackEmail"
                                label="chargeback email address"
                                topLabel="Chargeback Email Address"
                                placeHolder="Update chargeback email address"
                                containerVariant="w-full py-2 col-span-2"
                                value={stateValues?.chargeBackEmail}
                                handleChange={handleChange}
                            />

                            {/* <DefaultInput
                                type="text"
                                name="paymentMethod"
                                label="Payment Method"
                                topLabel="Chargeback Payment Method"
                                placeHolder="Update chargeback payment method"
                                containerVariant="w-full py-2 col-span-2"
                                value={stateValues?.paymentMethod}
                                handleChange={handleChange}
                            />

                            <DefaultInput
                                type="text"
                                name="sendToSpecificUsers"
                                label="Send to specific users"
                                topLabel="Send To Specific Users"
                                placeHolder="Update Send to specific users"
                                containerVariant="w-full py-2 col-span-2"
                                value={stateValues?.sendToSpecificUsers}
                                handleChange={handleChange}
                            /> */}

                            <div className="w-1/2 py-2 col-span-4 flex justify-center">
                                <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""} containerVariant={!stateValues?.submittingError ? "hidden" : ""} />
                            </div>

                            <DefaultButton
                                labelText="Create Business"
                                isLoading={stateValues?.isSubmitting}
                                handleClick={handleSubmit}
                                variant={"bg-selected cursor-pointer sm:w-1/2 min-w-max mb-10"}
                            />

                            <DefaultButton
                                labelText="Cancel"
                                handleClick={()=>router.push("/dashboard")}
                                type={"secondary"}
                                variant={" text-darkslateblue border border-darkslateblue cursor-pointer sm:w-1/2  mb-10"}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateBusiness;