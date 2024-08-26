import React, { useState } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { UserDetailProps } from '@types';
import { TableStatus, PoperDropDown, DefaultButton, DefaultInput, DefaultSelect } from '@/components/reusables';
import { GridRowId, useGridApiRef, GridColDef, DataGrid } from '@mui/x-data-grid';
import { BsPencilSquare, BsFillTrash3Fill, BsThreeDots, BsPlus, BsFillTrashFill, BsCaretDown, BsCircle, BsCircleFill } from 'react-icons/bs';
import { useNewSettlementContext } from 'context/newSettingsContext';
import { SettlmentController } from 'containers/settingsApi';
import { CountriesJson } from '@utils/helpers/CountriesJson';
import { BanksJson } from '@utils/helpers/BanksJson';
import DeleteAccount from '@/components/settlement/DeleteAccount';


const BlankSettlement = ({ handleSubmit }: any) => (
    <>
        <div className="w-full text-black text-base sm:text-5xl font-bold font-['Nunito'] sm:p-10">
            You have no settlement accounts
        </div>
        <DefaultButton
            icon={<BsPlus size={25} />}
            labelText="Add settlement account"
            handleClick={handleSubmit}
            variant={"bg-selected cursor-poNunito flex items-center p-0 min-w-max sm:ml-10"}
        />
    </>)

const Settlement = () => {

    const { handleCreate, handleClearError, selectEdit, setDeletingFunc, bankdata,
        handleEdit, handleChange, handleExtraChange, stateValues, handleMakePrimary, setAddSettlement, selectDelete } = SettlmentController()
    console.log(bankdata);
    return (
        <>
            <DashboardLayout>
                <main
                    className="relative flex flex-1 flex-col h-full mt-10 w-full overflow-x-auto transition-all duration-300 ease-in-out px-10 sm:px-12 pb-10"
                >
                    <header className="flex items-center justify-start">
                        <h1 className="text-2xl font-medium">
                            Settings - Settlement
                        </h1>
                    </header>
                    <div className="rounded-md bg-white h-full py-8 px-4 sm:px-16 w-full min-h-[100vh]">

                        {stateValues?.settementList && stateValues?.settementList?.length < 1 && !stateValues?.addSettlementCheck ?
                            <BlankSettlement handleSubmit={() => setAddSettlement("add")} />
                            :
                            <div>
                                {stateValues?.viewCheck == "add" ?
                                    <>
                                        <div
                                            style={{
                                                borderRadius: "1px",
                                                border: "1px solid #F0F0F0"
                                            }} className="w-full p-5 border border-gray-700 justify-between items-center gap-10 inline-flex">
                                            <div className="text-indigo-900 text-xl font-semibold font-['Nunito']">Add settlement account</div>
                                            <BsCaretDown />
                                        </div>
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10 w-full">

                                            <DefaultSelect
                                                name="country"
                                                label="Country"
                                                topLabel="Select Country"
                                                placeHolder="Enter Country"
                                                value={stateValues?.country}
                                                handleChange={handleChange}
                                                data={CountriesJson}
                                                containerVariant="w-full py-2 col-span-2"
                                            />
                                            <DefaultSelect
                                                name="bank"
                                                label="Bank"
                                                topLabel="Select Bank"
                                                placeHolder="Enter Bank"
                                                value={stateValues?.bank}
                                                handleChange={handleChange}
                                                data={BanksJson}
                                                containerVariant="w-full py-2 col-span-2"
                                            />
                                            <DefaultSelect
                                                name="currency"
                                                label="Currency"
                                                topLabel="Select Account currency"
                                                placeHolder="Enter Currency"
                                                value={stateValues?.currency}
                                                handleChange={handleChange}
                                                data={[{ id: 1, name: "Naira", value: "Naira" }, { id: 2, name: "Dollar", value: "Dollar" }]}
                                                containerVariant="w-full py-2 col-span-2"
                                            />
                                            <DefaultInput
                                                type="text"
                                                name="accountNumber"
                                                value={stateValues?.accountNumber}
                                                handleChange={handleChange}
                                                checkNum={true}
                                                label="Account number"
                                                topLabel="Account number"
                                                placeHolder="Enter account number"
                                                containerVariant="w-full py-2 col-span-2"
                                            />
                                            <DefaultSelect
                                                name="paymentMethod"
                                                label="Payment method"
                                                topLabel="Payment method"
                                                placeHolder="Enter payment method"
                                                value={stateValues?.paymentMethod}
                                                handleChange={handleChange}
                                                data={[{ id: 1, name: "Transfer", value: "Transfer" },
                                                { id: 2, name: "Card", value: "Card" },
                                                { id: 3, name: "PaymentLink", value: "PaymentLink" },
                                                { id: 4, name: "NQR", value: "NQRr" }
                                                ]}
                                                containerVariant="w-full py-2 col-span-2"
                                            />

                                            <div className="flex flex-col col-span-2 lg:col-span-3">
                                                <div className="flex items-start my-6">
                                                    <div className="flex items-center rounded-full h-5">
                                                        <input id="remember" type="checkbox"
                                                            checked={stateValues?.primary}
                                                            onChange={() => handleExtraChange("primary", !stateValues?.primary)}
                                                            className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                                            required />
                                                    </div>
                                                    <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                                                        Make this my primary settlement account
                                                    </label>
                                                </div>
                                                <div className='flex sm:flex-row flex-col gap-5'>
                                                    <DefaultButton
                                                        labelText="Cancel"
                                                        handleClick={() => setAddSettlement("list")}
                                                        type={"secondary"}
                                                        variant={" text-darkslateblue border border-darkslateblue cursor-poNunito min-w-max mb-10"}
                                                    />

                                                    <DefaultButton
                                                        labelText="Add Account"
                                                        isLoading={stateValues?.isSubmitting}
                                                        handleClick={handleCreate}
                                                        variant={"bg-selected cursor-poNunito w-full min-w-max"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : stateValues?.viewCheck == "edit" ?
                                        <>
                                            <div
                                                style={{
                                                    borderRadius: "1px",
                                                    border: "1px solid #F0F0F0"
                                                }} className="w-full p-5 border border-gray-700 justify-between items-center gap-10 inline-flex">
                                                <div className="text-indigo-900 text-xl font-semibold font-['Nunito']">Edit settlement account for {`No. ${stateValues?.id || "1"}`}</div>
                                                <BsCaretDown />
                                            </div>
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10 w-full">

                                                <DefaultSelect
                                                    name="country"
                                                    label="Country"
                                                    topLabel="Select Country"
                                                    placeHolder={stateValues?.country}
                                                    value={stateValues?.country}
                                                    handleChange={handleChange}
                                                    data={CountriesJson}
                                                    containerVariant="w-full py-2 col-span-2"
                                                />
                                                <DefaultSelect
                                                    name="bank"
                                                    label="Bank"
                                                    topLabel="Select Bank"
                                                    placeHolder={stateValues?.bank}
                                                    value={stateValues?.bank}
                                                    handleChange={handleChange}
                                                    data={BanksJson}
                                                    containerVariant="w-full py-2 col-span-2"
                                                />
                                                <DefaultSelect
                                                    name="currency"
                                                    label="Currency"
                                                    topLabel="Select Account currency"
                                                    placeHolder={stateValues?.currency}
                                                    value={stateValues?.currency}
                                                    handleChange={handleChange}
                                                    data={[{ id: 1, name: "Naira", value: "Naira" }, { id: 2, name: "Dollar", value: "Dollar" }]}
                                                    containerVariant="w-full py-2 col-span-2"
                                                />
                                                <DefaultInput
                                                    type="text"
                                                    name="accountNumber"
                                                    checkNum={true}
                                                    value={stateValues?.accountNumber}
                                                    handleChange={handleChange}
                                                    label="Account number"
                                                    topLabel="Account number"
                                                    placeHolder="Enter account number"
                                                    containerVariant="w-full py-2 col-span-2"
                                                />
                                                <DefaultSelect
                                                    name="paymentMethod"
                                                    label="Payment method"
                                                    topLabel="Payment method"
                                                    placeHolder={stateValues?.paymentMethod}
                                                    value={stateValues?.paymentMethod}
                                                    handleChange={handleChange}
                                                    data={[{ id: 1, name: "Transfer", value: "Transfer" },
                                                    { id: 2, name: "Card", value: "Card" },
                                                    { id: 3, name: "PaymentLink", value: "PaymentLink" },
                                                    { id: 4, name: "NQR", value: "NQRr" }
                                                    ]}
                                                    containerVariant="w-full py-2 col-span-2"
                                                />

                                                <div className="flex flex-col col-span-2 lg:col-span-3">
                                                    <div className="flex items-start my-6">
                                                        <div className="flex items-center rounded-full h-5">
                                                            <input id="remember" type="checkbox"
                                                                checked={stateValues?.primaryAccount}
                                                                onChange={() => handleExtraChange("primaryAccount", !stateValues?.primaryAccount)}
                                                                className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 rounded-full"
                                                                required />
                                                        </div>
                                                        <label htmlFor="remember" className="ml-2 text-base font-300 text-blackish">
                                                            Make this my primary settlement account
                                                        </label>
                                                    </div>
                                                    <div className='flex sm:flex-row flex-col gap-5'>
                                                        <DefaultButton
                                                            labelText="Cancel"
                                                            handleClick={() => setAddSettlement("list")}
                                                            type={"secondary"}
                                                            variant={" text-darkslateblue border border-darkslateblue cursor-poNunito min-w-max mb-10"}
                                                        />

                                                        <DefaultButton
                                                            labelText="Update Account"
                                                            isLoading={stateValues?.isSubmitting}
                                                            handleClick={handleEdit}
                                                            variant={"bg-selected cursor-poNunito w-full min-w-max"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div
                                                style={{
                                                    borderRadius: "1px",
                                                    border: "1px solid #F0F0F0"
                                                }} className="w-full p-5 border border-gray-700 jusify-start flex-col lg:flex-row lg:justify-between lg:items-center gap-5 inline-flex">
                                                <div className="text-indigo-900 text-xl font-semibold font-['Nunito']">Settlement accounts</div>

                                                <DefaultButton
                                                    icon={<BsPlus size={25} />}
                                                    labelText="Add settlement account"
                                                    handleClick={() => setAddSettlement("add")}
                                                    variant={"bg-selected cursor-poNunito flex items-center p-0 min-w-max"}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 xl:grid-cols-5 gap-5 mt-10 w-full">

                                                {stateValues?.settementList?.map((each: any, i: any) => (
                                                    <div key={i} className="relative col-span-2 w-full h-fit px-8 py-4 lg:py-8 bg-slate-50 rounded-tl-3xl rounded-tr-2xl rounded-bl rounded-br-2xl flex-col justify-start items-start gap-4 inline-flex">
                                                        <DefaultButton
                                                            labelText=""
                                                            type={"secondary"}
                                                            isLoading={each?.id == stateValues?.id ? stateValues?.isSubmitting : false}
                                                            variant={"absolute right-5 border-none bg-slate-50 "}
                                                        />
                                                        <div className="self-stretch text-darkslateblue text-xl font-semibold font-['Nunito'] leading-tight">
                                                            <span>{each?.id || ""}, </span><span>{each?.accountNumber || ""}</span></div>
                                                        <div className="self-stretch text-zinc-900 text-base font-normal font-['Nunito'] leading-tight">
                                                            <span>{each?.bankName || ""}, </span><span> {each?.country || ""}, </span> <span> {each?.currency || ""} </span>
                                                        </div>
                                                        <div className="self-stretch justify-between items-start inline-flex md:flex-row flex-col gap-5">
                                                            <div className="h-7 justify-start items-start gap-2 flex">
                                                                <div onClick={() => selectEdit(each)} className="w-16 p-2  bg-black bg-opacity-5 rounded-lg justify-start items-center gap-1 flex cursor-pointer">
                                                                    <BsPencilSquare className="text-darkslateblue w-4 h-4 relative" />
                                                                    <div className="text-darkslateblue text-sm font-semibold font-['Nunito'] leading-tight">Edit</div>
                                                                </div>
                                                                <div onClick={() => { selectDelete(each); }} className="w-20 p-2 bg-black bg-opacity-5 rounded-lg justify-start items-center gap-1 flex cursor-pointer">
                                                                    <BsFillTrashFill className="text-pink-500 w-4 h-4 relative" />
                                                                    <div className="text-pink-500 text-sm font-semibold font-['Nunito'] leading-tight">Delete</div>
                                                                </div>
                                                            </div>
                                                            <div className=" justify-end items-start gap-2 flex">
                                                                <div className=" p-1 rounded-lg justify-center items-center gap-1 flex">
                                                                    {each?.primaryAccount ?
                                                                        <div className='justify-center items-center gap-1 flex cursor-pointer md:flex-row flex-row-reverse'>
                                                                            <div className="text-sm font-semibold font-['Nunito'] leading-tight text-darkslateblue">Primary</div>
                                                                            <BsCircleFill color={"#23CB48"} className="text-green-500 w-5 h-5 relative" />
                                                                        </div> :
                                                                        <div onClick={() => handleMakePrimary(each)} className='justify-center items-center gap-1 flex cursor-pointer'>
                                                                            <div className="text-sm font-semibold font-['Nunito'] leading-tight text-darkslateblue">Make primary</div>
                                                                            <BsCircle color={"darkslateblue"} className=" w-5 h-5 relative" />
                                                                        </div>
                                                                    }
                                                                </div>
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
            <DeleteAccount
                show={stateValues?.setDeleting}
                setShow={setDeletingFunc}
                data={stateValues?.currentSettlement}
            />
        </>
    );
};

export default Settlement;