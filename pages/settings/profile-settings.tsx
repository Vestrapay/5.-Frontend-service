import React, {useRef, useState} from 'react';
import SettingsProfileLayout from "@pages/settings/index";
import {Camera} from "react-huge-icons/solid";
import {DefaultButton, DefaultInput} from "@reusables/index";
import Image from "next/image";

const ProfileSettings = () => {

    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState("");

    const fileInputRef = useRef();

    const handleFileInputClick = () => {
        // @ts-ignore
        fileInputRef.current.click();
    }

    const handleSubmit = () => {

    }

    return (
        <SettingsProfileLayout>
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
                            onChange={(e) => {
                                setFile(e.target.files[0])
                            }}
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

                    <div className="grid grid-cols-4 gap-5 mt-10 w-full">

                        <DefaultInput
                            type="text"
                            name="registered-username"
                            label="Registered Username"
                            topLabel="Registered Username"
                            placeHolder="Update username"
                            containerVariant="w-full py-2 col-span-2"
                        />

                        <DefaultInput
                            type="text"
                            name="registered-fullname"
                            label="Registered Full Name"
                            topLabel="Registered Full Name"
                            placeHolder="Update full name"
                            containerVariant="w-full py-2 col-span-2"
                        />

                        <DefaultInput
                            type="text"
                            name="email-address"
                            label="Email Address"
                            topLabel="Email Address"
                            placeHolder="Update email address"
                            containerVariant="w-full py-2 col-span-2"
                        />

                        <DefaultInput
                            type="text"
                            name="phone-number"
                            label="phone number"
                            topLabel="Phone Number"
                            placeHolder="Update phone number"
                            containerVariant="w-full py-2 col-span-2"
                        />

                        <div className="flex flex-col col-span-2">
                            <div className="flex items-start my-6">
                                <div className="flex items-center rounded-full h-5">
                                    <input id="remember" type="checkbox" value=""
                                           className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                           required/>
                                </div>
                                <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                                    I have read the <strong className="text-selected">Terms and Conditions</strong>
                                </label>
                            </div>
                            <DefaultButton
                                labelText={"Update"}
                                handleClick={handleSubmit}
                                variant={"bg-selected cursor-pointer w-1/2"}
                            />

                        </div>
                    </div>
                </form>
            </div>
        </SettingsProfileLayout>
    );
};

export default ProfileSettings;