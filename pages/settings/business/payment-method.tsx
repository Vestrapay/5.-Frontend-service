import React from 'react';
import SettingsProfileLayout from "@pages/settings";
import { businessNavLinks } from "@pages/settings/business/index";
import Image from "next/image";
import { Camera } from "react-huge-icons/solid";
import { DefaultButton, DefaultInput, DefaultSelect } from "@reusables/index";
import { AboutBusinessController } from 'containers/settingsApi';
import { paymentMethods } from '@utils/mocks';

const Notifications = () => {

    const { handleSubmit, handleClearError, handleChange, handleUpdatePM, handleExtraChange, stateValues, file, fileInputRef, handleFileInputClick, handleChangeFile } = AboutBusinessController()


    return (
        <SettingsProfileLayout navLinks={businessNavLinks} pageName={"Business"}>

            <div className="flex flex-col w-full mb-10 " >
                {paymentMethods && paymentMethods?.map((each: any, i: any) => {
                    return (
                        <div style={{
                            borderRadius: "1px",
                            border: "1px solid #F0F0F0"
                        }} key={i} className="grid grid-cols-2 lg:grid-cols-6 gap-10 w-full h-fit relative flex py-5 items-center">
                            <div className="w-full sm:col-span-5 col-span-2 px-10 flex flex-col gap-2">
                                <span className="text-neutral-700 text-base font-semibold font-['Nunito']">{each?.name || ""}</span>
                                <span className="text-neutral-700 text-base font-light font-['Nunito']">{each?.description || ""}</span>
                            </div>
                            <div className="w-full sm:col-span-1 col-span-2">
                                <div style={{
                                    borderRadius: "10px",
                                    border: "1px solid #382C7C"
                                }} onClick={() => handleUpdatePM(each)} className=" cursor-pointer text-center text-indigo-900 w-fit text-base font-normal font-['Nunito'] py-2 px-4 rounded-lg bg-white text-darkslateblue border border-darkslateblue">
                                   
                                    {!stateValues?.paymentMethod?.includes(each?.value) ?
                                        <span>Disable</span> :
                                        <span>Enable</span>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
                }

                <DefaultButton
                    labelText="Update"
                    isLoading={stateValues?.isSubmitting}
                    handleClick={handleSubmit}
                    variant={"bg-selected cursor-pointer w-fit mt-10"}
                />

            </div>

        </SettingsProfileLayout>
    );
};

export default Notifications;