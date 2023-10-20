import { PermissionController } from 'containers/permissionApi'
import React from 'react'
import { TableStatus, PoperDropDown, DefaultButton, DefaultInput, DefaultSelect } from '@/components/reusables';
import { GridRowId, useGridApiRef, GridColDef, DataGrid } from '@mui/x-data-grid';
import { BsPencilSquare, BsFillTrash3Fill, BsThreeDots, BsPlus, BsFillTrashFill, BsCaretDown, BsCircle, BsCircleFill } from 'react-icons/bs';
import { Switch } from '@mui/material';
import { LoginErrorCard } from '@utils/actions/error';

export function StepOne({ usePermissionController, users }: any) {

    const { handleCreate, handleClearError, selectEdit, setAddSteps,
        handleEdit, handleChange, handleExtraChange, stateValues, handleMakePrimary, setAddPermission, selectDelete } = usePermissionController;

    let userList = users?.map((each: any, i: any) => ({ id: i + 1, name: each?.username, value: each?.uuid }))

    return (

        <>
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-5 mt-10 w-full">

                <div className="w-full h-fit pr-1 gap-5 flex-col justify-start items-start inline-flex w-full py-2 col-span-2 xl:w-1/2">
                    <div className="w-full h-7 justify-start items-center gap-4 inline-flex">
                        <div className="px-2 py-1 bg-indigo-900 rounded-lg flex-col justify-start items-start inline-flex">
                            <div className="text-white text-xs font-medium font-['Nunito'] leading-none">Step 1 of 2</div>
                        </div>
                        <div className="flex-col justify-start items-start inline-flex">
                            <div className="text-zinc-800 text-2xl font-medium font-['Nunito'] leading-7">Role details</div>
                        </div>
                    </div>
                    <div className="text-slate-950 text-sm font-normal font-['Nunito'] leading-none">
                        Select a user to assign permissions to.</div>
                </div>

                <DefaultSelect
                    name="userId"
                    label="Select User"
                    topLabel="Select User"
                    placeHolder="Enter select user"
                    containerVariant="w-full py-2 col-span-2 xl:w-1/2"
                    value={stateValues?.userId}
                    handleChange={handleChange}
                    data={userList}
                />


                <DefaultInput
                    type="textarea"
                    textarea={true}
                    maxLength={250}
                    name="accountNumber"
                    value={stateValues?.accountNumber}
                    handleChange={handleChange}
                    label="Role description"
                    topLabel="Role description"
                    placeHolder="Enter role description"
                    containerVariant="w-full py-2 col-span-2 xl:w-1/2"
                />

                <div className="flex flex-col col-span-2 lg:col-span-3">
                    <div className='flex sm:flex-row flex-col gap-5'>
                        <DefaultButton
                            labelText="Cancel"
                            handleClick={() => setAddPermission("list")}
                            type={"secondary"}
                            variant={" text-darkslateblue border border-darkslateblue cursor-poNunito min-w-max mb-10"}
                        />

                        <DefaultButton
                            labelText="Continue to Permission"
                            isLoading={stateValues?.isSubmitting}
                            handleClick={() => handleExtraChange("addSteps", "two")}
                            variant={"bg-selected cursor-poNunito w-full min-w-max"}
                        />
                    </div>
                </div>
            </div>
        </>

    )
}

export function StepTwo({ usePermissionController }: any) {


    const { handleCreate, handleClearError, selectEdit, setDeletingFunc, handleSelectPermission, handleSelectAllPermission, handleCreateRole,
        handleEdit, handleChange, handleExtraChange, stateValues, handleMakePrimary, setAddPermission, selectDelete } = usePermissionController;


    return (

        <>
            <div className="w-full h-7 mt-10 justify-start items-center gap-4 inline-flex">
                <div className="px-2 py-1 bg-indigo-900 rounded-lg flex-col justify-start items-start inline-flex">
                    <div className="text-white text-xs font-medium font-['Nunito'] leading-none">Step 2 of 2</div>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                    <div className="text-zinc-800 text-2xl font-medium font-['Nunito'] leading-7">Assign permissions</div>
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
                        <Switch
                            checked={stateValues?.AddAllPerm}
                            onChange={() => handleSelectAllPermission("AddAllPerm", !stateValues?.AddAllPerm)}
                            name="AddAllPerm"
                        />
                        <div className="text-slate-950 text-sm font-normal font-['Nunito'] leading-tight">
                            Assign all permissions for this role (except for transfer of account
                            ownership this can only be done by the account owner)</div>
                    </div>
                </div>

                <hr className="h-px my-4 bg-neutral-200 border-0" />
            </div>


            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mt-5 w-full">
                {/* 
                <div className="col-span-2 lg:col-span-2">

                    <div style={{
                        borderBottom: "1px solid #F0F0F0"
                    }} className="w-full h-fit px-4 py-5 bg-gray-100 hover:bg-gray-50 border-b border-neutral-200 justify-start items-start inline-flex">
                        <div>
                            <span className="text-slate-950 text-sm font-bold font-['Nunito'] leading-snug">
                                Transactions permissions </span>
                            -
                            <span className="text-slate-950 text-sm font-normal font-['Nunito'] leading-snug"> Can access and manage transactions</span>
                        </div>
                    </div>
                    <div style={{
                        borderBottom: "1px solid #F0F0F0"
                    }} className="w-full h-fit px-4 py-5 bg-white hover:bg-gray-50 border-b border-neutral-200 justify-start items-start inline-flex">
                        <div>
                            <span className="text-slate-950 text-sm font-bold font-['Nunito'] leading-snug">
                                Customers permissions </span>
                            -
                            <span className="text-slate-950 text-sm font-normal font-['Nunito'] leading-snug"> Can access, create, manage and blacklist customers</span>
                        </div>
                    </div>
                    <div style={{
                        borderBottom: "1px solid #F0F0F0"
                    }} className="w-full h-fit px-4 py-5 bg-white hover:bg-gray-50 border-b border-neutral-200 justify-start items-start inline-flex">
                        <div>
                            <span className="text-slate-950 text-sm font-bold font-['Nunito'] leading-snug">
                                Balances permissions </span>
                            -
                            <span className="text-slate-950 text-sm font-normal font-['Nunito'] leading-snug"> Can access balance, settlements and top up wallets</span>
                        </div>
                    </div>
                </div> */}

                <div className="flex flex-col justify-between h-full gap-5 col-span-2 lg:col-span-4 ">
                    <div style={{
                        border: "1px solid #F0F0F0"
                    }} className="w-full h-fit relative rounded border border-neutral-200 p-[25px] grid grid-cols-1 lg:grid-cols-2">
                        <div className="w-full h-fit pb-4 border-b border-neutral-200 col-span-2">
                            <div className="text-slate-950 text-2xl font-medium font-['Nunito'] leading-7 w-full">All permissions</div>
                            <hr className="h-px my-5 bg-neutral-200 border-0" />
                            <div className="w-full text-slate-950 text-sm font-normal font-['Nunito'] leading-none">
                                Tick the boxes to select permissions you want to assign to this role.
                            </div>
                        </div>

                        {stateValues?.permissionList?.map((each: any, i: any) => {
                            console.log(each);
                            return (
                                <div className="w-fit h-9 flex items-center gap-3 col-span-1" key={i}>
                                    <div className="flex items-center rounded-full w-fit">
                                        <input id="notifyDashboardUsers" type="checkbox"
                                            name="notifyDashboardUsers"
                                            checked={each?.status}
                                            onChange={() => handleSelectPermission(i, each?.status)}
                                            className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
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
                    handleClick={() => handleExtraChange("addSteps", "one")}
                    type={"secondary"}
                    variant={" text-darkslateblue border border-darkslateblue cursor-poNunito min-w-max  items-end"}
                />

                <DefaultButton
                    labelText="Save role"
                    isLoading={stateValues?.isSubmitting}
                    handleClick={handleCreateRole}//() => handleExtraChange("addSteps", "three")}
                    variant={"bg-selected cursor-poNunito w-full min-w-max"}
                />
            </div>
        </>

    )
}

export function StepThree({ usePermissionController }: any) {


    const { handleCreate, handleClearError, selectEdit, setDeletingFunc,
        handleEdit, handleChange, handleExtraChange, stateValues, handleMakePrimary, setAddPermission, selectDelete } = usePermissionController;


    return (

        <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mt-5 w-full">

                <div className="col-span-2 lg:col-span-2 flex flex-col gap-5">
                    <div className="w-full h-fit pr-1 flex-col justify-start items-start gap-3 inline-flex w-full py-2 col-span-2 xl:w-2/3">
                        <div className="w-full h-7 justify-start items-center gap-4 inline-flex">
                            <div className="flex-col justify-start items-start inline-flex">
                                <div className="text-zinc-800 text-2xl font-medium font-['Nunito'] leading-7">
                                    Send an invite to new members
                                </div>
                            </div>
                        </div>
                        <div className="text-slate-950 text-sm font-normal font-['Nunito'] leading-none">
                            Enter the email address of the user you want to invite, and
                            choose the role they should have.
                        </div>
                    </div>

                    <DefaultInput
                        type="text"
                        name="accountNumber"
                        value={stateValues?.accountNumber}
                        handleChange={handleChange}
                        label="Name of role"
                        topLabel="Name of role"
                        placeHolder="Example chief of staff"
                        containerVariant="w-full py-2 col-span-2"
                    />

                    <DefaultSelect
                        name="selectRole"
                        label="Select Role"
                        topLabel="Select Role"
                        placeHolder="Enter select role"
                        containerVariant="w-full py-2"
                        value={stateValues?.selectRole}
                        handleChange={handleChange}
                        data={[{ id: 1, name: "Male", value: "male" }, { id: 1, name: "Female", value: "female" }]}
                    />

                    <div className="flex flex-col col-span-2 lg:col-span-3 mt-5">
                        <div className='flex sm:flex-row flex-col gap-5'>
                            <DefaultButton
                                labelText="Cancel"
                                handleClick={() => setAddPermission("list")}
                                type={"secondary"}
                                variant={" text-darkslateblue border border-darkslateblue cursor-poNunito min-w-max mb-10"}
                            />

                            <DefaultButton
                                labelText="Invite New Members"
                                isLoading={stateValues?.isSubmitting}
                                handleClick={() => handleExtraChange("addSteps", "two")}
                                variant={"bg-selected cursor-poNunito w-full min-w-max"}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between h-full gap-5 col-span-2 lg:col-span-2">
                    <div style={{
                        border: "1px solid #F0F0F0"
                    }} className="w-full h-fit relative rounded border border-neutral-200 p-[25px]">
                        <div className="w-full h-fit pb-4 border-b border-neutral-200 ">
                            <div className="text-slate-950 text-2xl font-medium font-['Nunito'] leading-7 w-full">Transactions permissions</div>
                            <hr className="h-px my-5 bg-neutral-200 border-0" />
                        </div>

                        <div className="w-fit h-9 flex items-center gap-3">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="notifyDashboardUsers" type="checkbox"
                                    name="notifyDashboardUsers"
                                    checked={stateValues?.notifyDashboardUsers}
                                    onChange={() => handleExtraChange("notifyDashboardUsers", !stateValues?.notifyDashboardUsers)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-sm font-normal font-['Nunito']">Send to all dashboard users</span>
                            </div>
                        </div>
                        <div className="w-fit h-9 flex items-center gap-3">
                            <div className="flex items-center rounded-full w-fit">
                                <input id="notifyDashboardUsers" type="checkbox"
                                    name="notifyDashboardUsers"
                                    checked={stateValues?.notifyDashboardUsers}
                                    onChange={() => handleExtraChange("notifyDashboardUsers", !stateValues?.notifyDashboardUsers)}
                                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                />
                            </div>
                            <div className="w-fit flex flex-col">
                                <span className="text-neutral-700 text-sm font-normal font-['Nunito']">Send to all dashboard users</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


export default function AddPermission({ usePermissionController, users }: any) {


    const { handleCreate, handleClearError, setAddSteps,
        handleEdit, handleChange, handleExtraChange, stateValues, handleMakePrimary, setAddPermission, selectDelete } = usePermissionController;

    return (
        <>
            <div
                style={{
                    borderRadius: "1px",
                    border: "1px solid #F0F0F0"
                }} className="w-full p-5 border border-gray-700 justify-between items-center gap-10 inline-flex">
                <div className="text-indigo-900 text-xl font-semibold font-['Nunito']">Add user permission</div>
                <BsCaretDown />
            </div>
            {
                stateValues?.addSteps == "two" ?
                    <StepTwo usePermissionController={usePermissionController} /> :
                    stateValues?.addSteps == "three" ?
                        <StepThree usePermissionController={usePermissionController} /> :
                        <StepOne usePermissionController={usePermissionController} users={users} />
            }
        </>
    )
}

