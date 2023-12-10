import React, { useRef, useState } from 'react';
import SettingsProfileLayout from "@pages/settings/profile-settings";
import { Camera } from "react-huge-icons/solid";
import { DefaultButton, DefaultInput } from "@reusables/index";
import Image from "next/image";
import { UsersProfileController } from 'containers/settingsApi';

const ProfileSettings = () => {

    const { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues, file, fileInputRef, handleFileInputClick, handleChangeFile } = UsersProfileController()


    return (
        // <SettingsProfileLayout>.   
        <div className="flex">
            <form
                className="flex flex-col w-full"
            >
                <div
                    className="flex relative flex-col rounded-full bg-slate-400 items-center justify-center h-36 w-36">
                    <input
                        type="file"
                        name="profile"
                        ref={fileInputRef}
                        accept={"image/*"}
                        onChange={handleChangeFile}
                        hidden
                    />
                    {
                        file &&
                        <Image
                            src={URL.createObjectURL(file)}
                            alt="profile"
                            width={144}
                            height={144}
                            className="rounded-full bg-contain absolute inset-y-0 inset-x-0"
                        />
                    }
                    <Camera
                        onClick={handleFileInputClick}
                        className="w-11 h-11 text-white cursor-pointer absolute opacity-80"
                    />

                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10 w-full">

                    <DefaultInput
                        type="text"
                        name="username"
                        isDisabled={true}
                        info={"Your username cannot be updated"}
                        value={stateValues?.username}
                        handleChange={handleChange}
                        label="Registered Username"
                        topLabel="Registered Username"
                        placeHolder="Registered username"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <DefaultInput
                        type="text"
                        name="businessName"
                        value={stateValues?.businessName}
                        handleChange={handleChange}
                        label="Business Name"
                        topLabel="Business Name"
                        placeHolder="Update business name"
                        containerVariant="w-full py-2 col-span-2"
                    />


                    <DefaultInput
                        type="text"
                        name="firstName"
                        value={stateValues?.firstName}
                        handleChange={handleChange}
                        label="Registered First Name"
                        topLabel="Registered First Name"
                        placeHolder="Update first name"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <DefaultInput
                        type="text"
                        name="lastName"
                        value={stateValues?.lastName}
                        handleChange={handleChange}
                        label="Registered Last Name"
                        topLabel="Registered Last Name"
                        placeHolder="Update last name"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <DefaultInput
                        type="text"
                        name="phoneNumber"
                        value={stateValues?.phoneNumber}
                        handleChange={handleChange}
                        checkNum={true}
                        maxLength={13}
                        minLength={11}
                        label="phone number"
                        topLabel="Phone Number"
                        placeHolder="Update phone number"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <DefaultInput
                        type="password"
                        name="password"
                        value={stateValues?.password}
                        handleChange={handleChange}
                        label="Password"
                        required
                        topLabel="Enter your Password"
                        placeHolder="Enter password"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <div className="flex flex-col col-span-2 lg:col-span-2">
                        <div className="flex items-start my-6">
                            <div className="flex items-center rounded-full h-5">
                                <input id="remember" type="checkbox" value=""
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                    required />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                                I have read the <strong className="text-selected">Terms and Conditions</strong>
                            </label>
                        </div>
                        <DefaultButton
                            labelText="Update"
                            isLoading={stateValues?.isSubmitting}
                            handleClick={handleSubmit}
                            variant={"bg-selected cursor-pointer w-1/2"}
                        />
                    </div>
                </div>
            </form>
        </div>
        // </SettingsProfileLayout>
    );
};

export default ProfileSettings;