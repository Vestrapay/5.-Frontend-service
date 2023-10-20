import { PermissionController } from 'containers/permissionApi'
import React from 'react'
import { TableStatus, PoperDropDown, DefaultButton, DefaultInput, DefaultSelect } from '@/components/reusables';
import { GridRowId, useGridApiRef, GridColDef, DataGrid } from '@mui/x-data-grid';
import { BsPencilSquare, BsFillTrash3Fill, BsThreeDots, BsPlus, BsFillTrashFill, BsCaretDown, BsCircle, BsCircleFill } from 'react-icons/bs';
import { Switch } from '@mui/material';
import { LoginErrorCard } from '@utils/actions/error';


export default function EditPermission({ usePermissionController, users }: any) {


    const { handleCreate, handleClearError, selectEdit, handleSelectPermission, handleSelectAllPermission, handleCreateRole, handleEditRole,
        handleEdit, handleChange, handleExtraChange, stateValues, handleMakePrimary, setAddPermission, fetchUsersRolesData } = usePermissionController;

    const { isLoading, isError, error, isSuccess, data, refetch } = fetchUsersRolesData(stateValues?.selectedUser?.uuid || "");


    return (
        <>
            <div
                style={{
                    borderRadius: "1px",
                    border: "1px solid #F0F0F0"
                }} className="w-full p-5 border border-gray-700 justify-between items-center gap-10 inline-flex">
                <div className="text-indigo-900 text-xl font-semibold font-['Nunito']">Edit user permission</div>
                <BsCaretDown />
            </div>


            <div className="w-full h-7 mt-10 justify-start items-center gap-4 inline-flex">
                <div className="px-2 py-1 bg-indigo-900 rounded-lg flex-col justify-start items-start inline-flex">
                    <div className="text-white text-xs font-medium font-['Nunito'] leading-none">Step 2 of 2</div>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                    <div className="text-zinc-800 text-2xl font-medium font-['Nunito'] leading-7">{`Edit ${stateValues?.selectedUser?.username + " " || ""}permissions`}</div>
                </div>
            </div>

            <div className="w-full  mt-10 md:w-1/2">
                <div className="text-slate-950 text-sm font-normal font-['Nunito'] leading-none py-2 ">
                    Define and assign the permissions and access for team members with
                    this role. You can make changes to this much later.
                </div>

                <hr className="h-px my-4 bg-neutral-200 border-0" />

                <div className="w-full h-fit relative border-t border-b border-neutral-200">
                    <div className="h-full pr-4 flex-row justify-start items-start inline-flex">
                        <div className="text-slate-950 text-sm font-normal font-['Nunito'] leading-tight">
                            {`Update the permissions for this role (except for transfer of account
                            ownership this can only be done by the account owner)`}</div>
                    </div>
                </div>

                <hr className="h-px my-4 bg-neutral-200 border-0" />
            </div>


            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mt-5 w-full">

                <div className="flex flex-col justify-between h-full gap-5 col-span-2 lg:col-span-4 ">
                    <div style={{
                        border: "1px solid #F0F0F0"
                    }} className="w-full h-fit relative rounded border border-neutral-200 p-[25px] grid grid-cols-1 lg:grid-cols-2">
                        <div className="w-full h-fit pb-4 border-b border-neutral-200 col-span-2">
                            <div className="text-slate-950 text-2xl font-medium font-['Nunito'] leading-7 w-full">All permissions</div>
                            <hr className="h-px my-5 bg-neutral-200 border-0" />
                            <div className="w-full text-slate-950 text-sm font-normal font-['Nunito'] leading-none">
                                Click to update the permissions assigned to this role.
                            </div>
                        </div>

                        {stateValues?.viewRolesList?.map((each: any, i: any) => {
                            console.log(each);

                            return (
                                <div className="w-fit h-9 flex items-center gap-3 col-span-1" key={i}>
                                    <div className="flex items-center rounded-full w-fit">
                                        {/* <input id="notifyDashboardUsers" type="checkbox"
                                            name="notifyDashboardUsers"
                                            checked={each?.status}
                                            onChange={() => handleSelectPermission(i, each?.status)}
                                            className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                        /> */}
                                        <Switch
                                            checked={each?.status}
                                            onChange={() => handleEditRole(each?.status, each?.value, stateValues?.selectedUser?.uuid, i)}
                                            name="AddAllPerm"
                                        />
                                    </div>
                                    <div className="w-fit flex flex-col">
                                        <span className="text-neutral-700 text-sm font-normal font-['Nunito']">{each?.name || ""}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
            <div className="w-full  mt-10 md:w-1/2">
                <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""} containerVariant={!stateValues?.submittingError ? "hidden" : ""} />
            </div>

            <div className='flex sm:flex-row flex-col gap-5 h-fit items-end my-10'>
                <DefaultButton
                    labelText="Cancel"
                    handleClick={() => setAddPermission("list")}
                    type={"secondary"}
                    variant={" text-darkslateblue border border-darkslateblue cursor-poNunito min-w-max  items-end"}
                />
                <DefaultButton
                    labelText="Cancel"
                    handleClick={() => handleExtraChange("addSteps", "one")}
                    isLoading={stateValues?.isSubmitting}
                    type={"secondary"}
                    variant={" text-white border-none border-white cursor-pointer min-w-max  items-end"}
                />
            </div>

        </>
    )
}

