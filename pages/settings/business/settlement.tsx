import React from 'react';
import SettingsProfileLayout from "@pages/settings";
import { businessNavLinks } from "@pages/settings/business/index";
import Image from "next/image";
import { Camera } from "react-huge-icons/solid";
import { DefaultButton, DefaultInput, DefaultSelect } from "@reusables/index";
import { AboutBusinessController } from 'containers/settingsApi';

const Settlement = () => {

    const { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues, file, fileInputRef, handleFileInputClick, handleChangeFile } = AboutBusinessController()

    return (
        <SettingsProfileLayout navLinks={businessNavLinks} pageName={"Business"}>
            <form
                className="flex flex-col w-full mb-20"
            >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full">

                    <DefaultSelect
                        name="settlementTime"
                        label="Settlement Time"
                        topLabel="Settlement Time"
                        containerVariant="w-full py-2 col-span-2"
                        value={stateValues?.settlementTime}
                        handleChange={handleChange}
                        data={stateValues?.settlementDuration?.map((each: string, i: any) => ({id: i + 1, value: each, name: each }))}
                    />

                    <DefaultButton
                        labelText="Update"
                        isLoading={stateValues?.isSubmitting}
                        handleClick={handleSubmit}
                        containerVariant=' col-span-3'
                        variant={"bg-selected cursor-pointer w-1/3"}
                    />

                </div>
            </form>
        </SettingsProfileLayout>
    );
};

export default Settlement;