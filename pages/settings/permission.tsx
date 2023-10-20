import React, { useState } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { UserDetailProps } from '@types';
import { TableStatus, PoperDropDown, DefaultButton, DefaultInput, DefaultSelect } from '@/components/reusables';
import { GridRowId, useGridApiRef, GridColDef, DataGrid } from '@mui/x-data-grid';
import { BsPencilSquare, BsEyeFill, BsPlus, BsFillTrashFill, BsCaretDown, BsCircle, BsCircleFill } from 'react-icons/bs';
import { CountriesJson } from '@utils/helpers/CountriesJson';
import { BanksJson } from '@utils/helpers/BanksJson';

import { useNewSettlementContext } from 'context/newSettingsContext';
import DeleteAccount from '@/components/settlement/DeleteAccount';
import { PermissionController } from 'containers/permissionApi';
import AddPermission from '@/components/permission/AddPermission';
import { fetchUsersData } from 'containers/usersApi';
import EditPermission from '@/components/permission/EditPermission';


const BlankPermission = ({ handleSubmit }: any) => (
    <>
        <div className="w-full text-black text-base sm:text-5xl font-bold font-['Nunito'] sm:p-10">
            You have no user permission created
        </div>
        <DefaultButton
            icon={<BsPlus size={25} />}
            labelText="Add User Permission"
            handleClick={handleSubmit}
            variant={"bg-selected cursor-poNunito flex items-center p-0 min-w-max sm:ml-10"}
        />
    </>)

const Permission = () => {

    const usePermissionController = PermissionController()

    const { data } = fetchUsersData(0, "", "");

    const { handleClearError, setViewRole,
        handleEdit, handleChange, handleExtraChange, stateValues, setAddPermission } = usePermissionController;

    return (
        <>
            <DashboardLayout>
                <main
                    className="relative flex flex-1 flex-col h-full mt-10 w-full overflow-x-auto transition-all duration-300 ease-in-out px-10 sm:px-12 pb-10"
                >
                    <header className="flex items-center justify-start">
                        <h1 className="text-2xl font-medium">
                            Settings - Roles and Permissions
                        </h1>
                    </header>
                    <div className="rounded-md bg-white h-full py-8 px-4 sm:px-16 w-full min-h-[100vh]">

                        {stateValues?.permissionList && stateValues?.permissionList?.length < 1 && !stateValues?.addPermissionCheck ?
                            <BlankPermission handleSubmit={() => setAddPermission("addPermission")} />
                            :
                            <div>
                                {stateValues?.viewCheck == "addPermission" ?
                                    <AddPermission usePermissionController={usePermissionController} users={data} />
                                    : stateValues?.viewCheck == "edit" ?
                                        <EditPermission usePermissionController={usePermissionController} users={data} />
                                        :
                                        <>
                                            <div
                                                style={{
                                                    borderRadius: "1px",
                                                    border: "1px solid #F0F0F0"
                                                }} className="w-full p-5 border border-gray-700 jusify-start flex-col lg:flex-row lg:justify-between lg:items-center gap-5 inline-flex">
                                                <div className="text-indigo-900 text-xl font-semibold font-['Nunito']">User Roles</div>

                                                <DefaultButton
                                                    icon={<BsPlus size={25} />}
                                                    labelText="New user permission"
                                                    handleClick={() => setAddPermission("addPermission")}
                                                    variant={"bg-selected cursor-poNunito flex items-center p-0 min-w-max"}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 xl:grid-cols-5 gap-5 mt-10 w-full">

                                                {data?.map((each: any, i: any) => (
                                                    <div key={i} className="relative col-span-2 w-full h-fit px-8 py-4 lg:py-8 bg-slate-50 rounded-tl-3xl rounded-tr-2xl rounded-bl rounded-br-2xl flex-col justify-start items-start gap-4 inline-flex">
                                                        <DefaultButton
                                                            labelText=""
                                                            isLoading={each?.id == stateValues?.id ? stateValues?.isSubmitting : false}
                                                            variant={"absolute right-5 border-none bg-slate-50 "}
                                                            containerVariant={"bg-slate-50"}
                                                        />
                                                        <div className="self-stretch text-darkslateblue text-xl font-semibold font-['Nunito'] leading-tight">
                                                            <span>{each?.userType || ""}</span>
                                                        </div>
                                                        <div className="self-stretch text-darkslateblue text-lg font-semibold font-['Nunito'] leading-tight">
                                                            <span>{each?.username || ""}</span>
                                                        </div>
                                                        <div className="self-stretch text-zinc-900 text-base font-normal font-['Nunito'] leading-tight">
                                                            <span>{each?.uuid || ""}</span>
                                                        </div>
                                                        <div className="self-stretch justify-between items-start inline-flex md:flex-row flex-col gap-5">
                                                            <div className="h-7 justify-start items-start gap-2 flex">
                                                                <div onClick={() => setViewRole("edit", each)} className="w-full p-2  bg-black bg-opacity-5 rounded-lg justify-start items-center gap-3 flex cursor-pointer">
                                                                    <BsEyeFill className="text-darkslateblue w-4 h-4 relative" />
                                                                    <div className="text-darkslateblue text-sm font-semibold font-['Nunito'] leading-tight">View Permissions</div>
                                                                </div>
                                                                {/* <div onClick={() => { selectDelete(each); }} className="w-full min-w-max p-2 bg-black bg-opacity-5 rounded-lg justify-start items-center gap-1 flex cursor-pointer">
                                                                    <BsFillTrashFill className="text-pink-500 w-4 h-4 relative" />
                                                                    <div className="text-pink-500 text-sm font-semibold font-['Nunito'] leading-tight">Remove Permissions</div>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>))}

                                            </div>
                                        </>
                                }
                            </div>
                        }
                    </div>

                </main>
            </DashboardLayout>
        </>
    );
};

export default Permission;