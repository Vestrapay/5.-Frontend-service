import React from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { BsCaretDown } from 'react-icons/bs';
import { DefaultButton, DefaultInput } from '@/components/reusables';
import { WebHooksController } from 'containers/settingsApi';

const Webhook = () => {

    const { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues } = WebHooksController()

    return (
        <DashboardLayout>
            <main
                className="relative flex flex-1 flex-col h-full mt-10 w-full overflow-x-auto transition-all duration-300 ease-in-out px-10 sm:px-12 pb-10"
            >
                <header className="flex items-center justify-start">
                    <h1 className="text-2xl font-medium">
                        Settings - Web hooks
                    </h1>
                </header>


                <div className="rounded-md bg-white h-full py-8 px-4 sm:px-16 w-full min-h-[100vh]">

                    <div
                        style={{
                            borderRadius: "1px",
                            border: "1px solid #F0F0F0"
                        }} className="w-full p-5 border border-gray-700 justify-between items-center gap-10 inline-flex">
                        <div className="text-indigo-900 text-xl font-semibold font-['Nunito']">Test webhooks</div>
                        <BsCaretDown />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 my-10 w-full">
                        <DefaultInput
                            type="url"
                            name="url"
                            label="Url"
                            topLabel="Url"
                            placeHolder="Enter Url"
                            containerVariant="w-full py-2 col-span-2 lg:col-span-3"
                            value={stateValues?.url}
                            handleChange={handleChange}
                        />
                        <DefaultInput
                            type="password"
                            name="secretHash"
                            label="Secret Hash"
                            topLabel="Secret Hash"
                            placeHolder="Enter Secret Hash"
                            containerVariant="w-full py-2 col-span-2  lg:col-span-3"
                            value={stateValues?.secretHash}
                            handleChange={handleChange}
                        />

                        <DefaultButton
                            labelText="Save"
                            containerVariant="w-full py-2 sm:col-span-3 col-span-2 max-w-fit"
                            variant="w-full px-5"
                            isLoading={stateValues?.isSubmitting}
                            handleClick={handleSubmit}
                            isDisabled={stateValues?.isDisabled}
                        />


                    </div>
                    <div className="w-fit h-fit flex-col justify-start items-start gap-5 inline-flex">
                        <div className="text-black text-xl font-normal font-['Nunito']"> Note:</div>
                        <div className="flex-col justify-start items-start gap-3 flex">
                            <div className=" flex flex-row w-full self-stretch items-center gap-2 grow shrink basis-0 relative">
                                <div className="w-4 h-4 ">
                                    <div className="w-4 h-4 bg-indigo-900 rounded-full" />
                                </div>
                                <div className="w-full h-fit text-neutral-700 text-sm font-normal font-['Nunito']">
                                    webhook responses are in JSON format</div>
                            </div>
                            <div className=" flex flex-row w-full self-stretch items-center gap-2 grow shrink basis-0 relative">
                                <div className="w-4 h-4 ">
                                    <div className="w-4 h-4 bg-indigo-900 rounded-full" />
                                </div>
                                <div className="w-full h-fit text-neutral-700 text-sm font-normal font-['Nunito']">Webhook responses are retried every 5 minutes after failure</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default Webhook;
