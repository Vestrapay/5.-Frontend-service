import React from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { DefaultButton } from '@/components/reusables';
import { BsCaretDown } from 'react-icons/bs';

const Permission = () => {
    return (
        
        <DashboardLayout>
            <main
                className="relative flex flex-1 flex-col h-full mt-10 w-full overflow-x-auto transition-all duration-300 ease-in-out px-10 sm:px-12 pb-10"
            >
                <header className="flex items-center justify-start">
                    <h1 className="text-2xl font-medium">
                        Settings - Permission
                    </h1>
                </header>


                <div className="rounded-md bg-white h-full py-8 px-4 sm:px-16 w-full min-h-[100vh]">

                    <div
                        style={{
                            borderRadius: "1px",
                            border: "1px solid #F0F0F0"
                        }} className="w-full p-5 border border-gray-700 justify-between items-center gap-10 inline-flex">
                        <div className="text-indigo-900 text-xl font-semibold font-['Nunito']">User Roles and Permission</div>
                        <BsCaretDown />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 my-10 w-full">

                        <DefaultButton
                            labelText="Permissions"
                            containerVariant="w-full py-2 sm:col-span-3 col-span-2 max-w-fit"
                            variant="w-full px-5"
                        // isLoading={isSubmitting}
                        // handleClick={handelSubmit}
                        // isDisabled={isDisabled}
                        />

                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default Permission;