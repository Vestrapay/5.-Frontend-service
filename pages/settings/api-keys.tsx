import React from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SettingsProfileLayout from './profile-settings';
import { DefaultButton, DefaultInput } from '@/components/reusables';
import { BsCaretDown } from 'react-icons/bs';
import { APIKEYSController } from 'containers/settingsApi';
import successAlert from '@utils/actions/success';



const ApiKeys = () => {


    const { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues, file, fileInputRef, handleFileInputClick, handleChangeFile } = APIKEYSController()

    return (

        <DashboardLayout>
            <main
                className="relative flex flex-1 flex-col h-full mt-10 w-full overflow-x-auto transition-all duration-300 ease-in-out px-10 sm:px-12 pb-10"
            >
                <header className="flex items-center justify-start">
                    <h1 className="text-2xl font-medium">
                        Settings - API Keys
                    </h1>
                </header>


                <div className="rounded-md bg-white h-full py-8 px-4 sm:px-16 w-full min-h-[100vh]">

                    <div
                        style={{
                            borderRadius: "1px",
                            border: "1px solid #F0F0F0"
                        }} className="w-full p-5 border border-gray-700 justify-between items-center gap-10 inline-flex">
                        <div className="text-indigo-900 text-xl font-semibold font-['Nunito']">Test API Keys</div>
                        <BsCaretDown />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 my-10 w-full">
                        <div className='flex flex-col sm:flex-row gap-3 col-span-2 sm:items-end items-start justify-start'>
                            <DefaultInput
                                type="password"
                                name="publicKey"
                                isDisabled={true}
                                label="Public Key"
                                topLabel="Public Key"
                                placeHolder="Public Key"
                                containerVariant="w-full py-2"
                                value={stateValues?.apiKeys?.publicKey || ""}
                            />
                            <DefaultButton
                                labelText="copy"
                                containerVariant="w-full py-2 sm:col-span-3 max-w-fit"
                                variant="w-full px-5"
                                type={"secondary"}
                                isLoading={stateValues?.isSubmitting}
                                handleClick={() => {
                                    navigator.clipboard.writeText(stateValues?.apiKeys?.publicKey || "");
                                    successAlert({
                                        title: "Copied!", text: "You've copied the api key.", icon: "",
                                    }, { data: "", errors: "", message: "", statusCode: "", status: "" })
                                }}
                                isDisabled={stateValues?.isDisabled}
                            />
                        </div>
                        <div className='flex flex-col sm:flex-row gap-3 col-span-2 sm:items-end items-start justify-start'>
                            <DefaultInput
                                type="password"
                                name="secretKey"
                                isDisabled={true}
                                label="Secret Key"
                                topLabel="Secret Key"
                                placeHolder="Secret Key"
                                containerVariant="w-full py-2"
                                value={stateValues?.apiKeys?.secretKey || ""}
                            />
                            <DefaultButton
                                labelText="copy"
                                containerVariant="w-full py-2 sm:col-span-3 max-w-fit"
                                variant="w-full px-5"
                                type={"secondary"}
                                isLoading={stateValues?.isSubmitting}
                                handleClick={() => {
                                    navigator.clipboard.writeText(stateValues?.apiKeys?.secretKey || "");
                                    successAlert({
                                        title: "Copied!", text: "You've copied the api key.", icon: "",
                                    }, { data: "", errors: "", message: "", statusCode: "", status: "" })
                                }}
                                isDisabled={stateValues?.isDisabled}
                            />
                        </div>
                        <div className='flex flex-col sm:flex-row gap-3 col-span-2 sm:items-end items-start justify-start'>
                            <DefaultInput
                                type="password"
                                name="encryptionKey"
                                isDisabled={true}
                                label="Encryption Key"
                                topLabel="Encryption Key"
                                placeHolder="Encryption Key"
                                containerVariant="w-full py-2"
                                value={stateValues?.apiKeys?.encryptionKey || ""}
                            />
                            <DefaultButton
                                labelText="copy"
                                containerVariant="w-full py-2 sm:col-span-3 max-w-fit"
                                variant="w-full px-5"
                                type={"secondary"}
                                isLoading={stateValues?.isSubmitting}
                                handleClick={() => {
                                    navigator.clipboard.writeText(stateValues?.apiKeys?.encryptionKey || "");
                                    successAlert({
                                        title: "Copied!", text: "You've copied the api key.", icon: "",
                                    }, { data: "", errors: "", message: "", statusCode: "", status: "" })
                                }}
                                isDisabled={stateValues?.isDisabled}
                            />
                        </div>
                        <DefaultButton
                            labelText="Generate"
                            containerVariant="w-full py-2 sm:col-span-3 col-span-2 max-w-fit"
                            variant="w-full px-5"
                            isLoading={stateValues?.isSubmitting}
                            handleClick={handleSubmit}
                            isDisabled={stateValues?.isDisabled}
                        />

                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default ApiKeys;