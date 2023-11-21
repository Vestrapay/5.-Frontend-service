"use client"
import React from 'react';
import Image from "next/image";
import { LineHorizontal, ProfileImage3 } from "@reusables/images";
import { MdCancel } from "react-icons/md";
import { useNewDisputeContext } from "../../context/disputeLogContext";
import { Camera } from "react-huge-icons/bulk";
import { DefaultButton, DefaultInput, DefaultSelect } from '../reusables';
import { updateUserController } from 'containers/usersApi';
import { LoginErrorCard } from '@utils/actions/error';
import { UserDetailProps } from '@types';
import { useAuthContext } from "../../context/AuthContext";
import { BsFileEarmarkImage, BsFillTrashFill } from 'react-icons/bs';
import { updateDisputesController } from 'containers/disputeLogApi';


const UpdateDispute = ({ data, id }: { data: any, id: number | string }) => {

    const { setIsEditDispute } = useNewDisputeContext()

    const { files, stateValues, handleSubmit, handleChangeFile, handleClearError,
        handleClearFiles, handleChange, handleExtraChange } = updateDisputesController(data, id);


    const { comment, reference, lastName, submittingError, errorMssg, isSubmitting } = stateValues

    return (
        <>
            <div className="flex flex-col items-center w-full relative">
                <div className="flex justify-between w-full mb-14">
                    <span
                        className="flex justify-start text-left font-bold capitalize">Update Dispute</span>
                    <MdCancel
                        onClick={() => setIsEditDispute(false)}
                        width={15} height={15}
                        className="text-red text-2xl opacity-40 absolute top-0 right-2 cursor-pointer hover:opacity-100 hover:scale-205 transition-all active:opacity-80 active:scale-200"
                    />
                </div>

            </div>
            <div className="flex flex-col w-full">
                <DefaultInput
                    type="text"
                    name="reference"
                    label="Reference"
                    topLabel="Reference"
                    placeHolder="Enter Reference"
                    containerVariant="w-full py-2"
                    value={reference}
                    handleChange={handleChange}
                />
                <DefaultInput
                    type="text"
                    name="comment"
                    label="Comment"
                    topLabel="Comment"
                    placeHolder="Enter Comment"
                    containerVariant="w-full py-2"
                    value={comment}
                    handleChange={handleChange}
                />
                <label className={`text-blackish font-300 my-5 `}>
                    Select Transaction Receipt
                </label>
                <div className="flex items-center justify-center w-full mb-8">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-fit h-fit rounded-lg cursor-pointer flex-wrap">
                        <div className='flex flex-row justify-between items-center w-full gap-5'>
                            <div className='h-fit w-fit m-0 p-0 rounded-xl shadow-[0px_2px_20px_rgba(100,108,156,0.125)] bg-[#ffffff00] flex flex-col justify-between'>
                                {<img src={'/assets/svg/uploadFileSmall.svg'} alt="" className="h-auto max-w-full" />}
                            </div>
                            <div>
                                <BsFillTrashFill size={25} onClick={handleClearFiles} />
                            </div>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleChangeFile} />
                    </label>
                </div>

                {files && files?.length > 0 ?
                    files?.map((each: any, i: any) => {

                        return <div className='h-fit rounded-lg flex flex-col gap-1 justify-between border border-gray-200' key={i}>
                            <div className=' w-fit text-base font-400 flex gap-5 items-center px-5 py-0'>
                                <span><BsFileEarmarkImage color="382C7C" size={25} /></span>
                                {each?.name || "File"}</div>
                            <div className='text-gray-400 w-fit text-base font-400 flex gap-5 items-center px-5 py-0'>{
                                (each?.size / 1000000 || 0).toFixed(2)} MB</div>
                        </div>
                    })
                    : null
                }

                <div className=" flex flex-col-reverse gap-5 mt-8 sm sm:flex-row justify-between items-center">
                    <DefaultButton
                        labelText="Update dispute"
                        containerVariant="w-full"
                        variant="w-full"
                        isLoading={isSubmitting}
                        handleClick={handleSubmit}
                    />
                </div>

                <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""}
                    containerVariant={!stateValues?.submittingError ? "hidden" : ""} />

            </div>
        </>
    );
};

export default UpdateDispute;