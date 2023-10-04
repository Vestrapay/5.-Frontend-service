import React, {useRef, useState} from 'react';
import SettingsProfileLayout from "@pages/settings/index";
import {Camera} from "react-huge-icons/solid";

const ProfileSettings = () => {

    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState("");

    const fileInputRef = useRef();

    const handleFileInputClick = () => {
        // @ts-ignore
        fileInputRef.current.click();
    }

    const handleFileUpload = () => {

    }

    return (
        <SettingsProfileLayout>
            <div className="flex">
                <form
                    className="flex flex-col w-full"
                >
                    <div className="flex flex-col rounded-full bg-slate-400 items-center justify-center h-36 w-36">
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
                            file ?
                                (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="profile"
                                        className="rounded-full h-36 w-36 bg-cover"
                                    />
                                ) : (
                                    <Camera
                                        onClick={handleFileInputClick}
                                        className="w-11 h-11 text-white cursor-pointer"
                                    />
                                )
                        }
                    </div>

                    <div className="grid grid-cols-4 gap-5 mt-10 w-full">
                        <div className="flex flex-col col-span-2">
                            <label
                                htmlFor="registered-username"
                            >
                                Registered Username
                            </label>
                            <input
                                type="text"
                                name="registered-username"
                                className="rounded-md p-2 mt-2 border-none bg-slate-100 font-nunito"
                                placeholder="Update username"
                            />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label
                                htmlFor="registered-fullname"
                            >
                                Registered Full Name
                            </label>
                            <input
                                type="text"
                                name="registered-fullname"
                                className="rounded-md p-2 mt-2 border-none bg-slate-100 font-nunito"
                                placeholder="Update full name"
                            />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label
                                htmlFor="email"
                            >
                                Email Address
                            </label>
                            <input
                                type="text"
                                name="email"
                                className="rounded-md p-2 mt-2 border-none bg-slate-100 font-nunito"
                                placeholder={"Update email address"}
                            />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <label
                                htmlFor="phone-number"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phone-number"
                                className="rounded-md p-2 mt-2 border-none bg-slate-100 font-nunito"
                                placeholder={"Update phone number"}
                            />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <div className="flex items-start my-6">
                                <div className="flex items-center rounded-full h-5">
                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full" required />
                                </div>
                                <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                                    I have read the <strong className="text-selected">Terms and Conditions</strong>
                                </label>
                            </div>
                            <button
                                className="bg-selected rounded-md p-2 border-none font-nunito text-white col-span-1 cursor-pointer hover:opacity-95 transition-all duration-300 ease-in-out"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </SettingsProfileLayout>
    );
};

export default ProfileSettings;