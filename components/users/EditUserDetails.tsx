"use client"
import React from 'react';
import Image from "next/image";
import { LineHorizontal, ProfileImage3 } from "@reusables/images";
import { MdCancel } from "react-icons/md";
import { useNewUserContext } from "../../context/newUserContext";
import { Camera } from "react-huge-icons/bulk";
import { DefaultButton, DefaultInput, DefaultSelect } from '../reusables';
import { updateUserController } from 'containers/usersApi';
import { LoginErrorCard } from '@utils/actions/error';
import { UserDetailProps } from '@types';

const CreateUser = ({ data, id }: { data: UserDetailProps, id: number | string }) => {

    const { setIsEditUser } = useNewUserContext()

    const { stateValues, handleSubmit, handleClearError, handleChange, handleExtraChange } = updateUserController(data, id);

    const { country, firstName, lastName, email, phoneNumber, businessName, enabled, username, submittingError, errorMssg, isSubmitting } = stateValues

    return (
        <>
            <div className="flex flex-col items-center w-full relative">
                <div className="flex justify-between w-full mb-5">
                    <span className="flex justify-start text-left font-bold">Edit User</span>
                    <MdCancel
                        onClick={() => setIsEditUser(false)}
                        width={15} height={15}
                        className="text-red text-2xl opacity-40 absolute top-0 right-2 cursor-pointer hover:opacity-100 hover:scale-205 transition-all active:opacity-80 active:scale-200"
                    />
                </div>

                <div className="flex justify-center items-center p-10 bg-slate-100 rounded-full">
                    <Camera className={"w-10 h-10 text-unselected m-0"} />
                </div>
            </div>
            <div className="flex flex-col w-full">
                <DefaultInput
                    type="text"
                    name="businessName"
                    label="Business Name"
                    topLabel="Business Name"
                    placeHolder="Enter Business Name"
                    containerVariant="w-full py-2"
                    value={businessName}
                    handleChange={handleChange}
                />
                <DefaultInput
                    type="text"
                    name="username"
                    label="Username"
                    topLabel="Username"
                    placeHolder="Enter Username"
                    containerVariant="w-full py-2"
                    value={username}
                    handleChange={handleChange}
                />
                <DefaultInput
                    type="text"
                    name="firstName"
                    label="First Name"
                    topLabel="First Name"
                    placeHolder="Enter First Name"
                    containerVariant="w-full py-2"
                    value={firstName}
                    handleChange={handleChange}
                />
                <DefaultInput
                    type="text"
                    name="lastName"
                    label="Last Name"
                    topLabel="Last Name"
                    placeHolder="Enter Last Name"
                    containerVariant="w-full py-2"
                    value={lastName}
                    handleChange={handleChange}
                />
                <DefaultInput
                    type="text"
                    name="email"
                    label="Email"
                    topLabel="Email"
                    placeHolder="Enter Email Address"
                    containerVariant="w-full py-2"
                    value={email}
                    handleChange={handleChange}
                />
                <DefaultInput
                    type="text"
                    name="phoneNumber"
                    label="Phone Number"
                    topLabel="Phone Number"
                    placeHolder="Enter Phone Number"
                    containerVariant="w-full py-2"
                    maxLength={13}
                    minLength={11}
                    checkNum={true}
                    value={phoneNumber}
                    handleChange={handleChange}
                />
                <DefaultInput
                    type="text"
                    name="country"
                    label="Country"
                    topLabel="Country"
                    placeHolder="Enter Country"
                    containerVariant="w-full py-2"
                    value={country}
                    handleChange={handleChange}
                />
                <DefaultSelect
                    name="enabled"
                    label="User Status"
                    topLabel="User Status"
                    placeHolder="Enter User Status"
                    containerVariant="w-full py-2"
                    value={enabled}
                    handleChange={handleChange}
                    data={[{ id: 1, name: "Enabled", value: true }, { id: 1, name: "Not Enabled", value: false }]}
                />

                {/* <DefaultSelect
                    name="userRole"
                    label={`User's Role`}
                    topLabel={`User's Role`}
                    placeHolder="Enter User's Role"
                    containerVariant="w-full py-2 mb-5"
                    // value={pin}
                    // handleChange={handleChange}
                    data={[{ id: 1, name: "Front Desk Officer", value: "frontDeskOfficer" }]}
                /> */}
                {/* 
                <DefaultInput
                    type="password"
                    name="password"
                    label="Password"
                    topLabel="Password"
                    placeHolder="Enter Password"
                    containerVariant="w-full py-2 mb-5"
                    value={password}
                    handleChange={handleChange}
                /> */}

                <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""} containerVariant={!stateValues?.submittingError ? "hidden" : ""} />

                <div className=" flex flex-col-reverse gap-5 my-5  sm sm:flex-row justify-between items-center">
                    <DefaultButton
                        labelText="Edit User"
                        containerVariant="w-full"
                        variant="w-full"
                        isLoading={isSubmitting}
                        handleClick={handleSubmit}
                    />
                </div>



            </div>
        </>
    );
};

export default CreateUser;