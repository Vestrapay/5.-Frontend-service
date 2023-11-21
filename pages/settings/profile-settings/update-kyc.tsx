import React from 'react';
import SettingsProfileLayout from "@pages/settings/profile-settings";
import { Camera } from "react-huge-icons/solid";
import { DefaultButton, DefaultInput } from "@reusables/index";
import Image from "next/image";
import { UpdateKYCController, UsersProfileController } from 'containers/settingsApi';
import { BsFileEarmarkImage, BsCheckCircleFill } from 'react-icons/bs';
import { default as UploadFile } from '@assets/svg/uploadFile.svg';
import { default as UploadFileSmall } from '@assets/svg/uploadFileSmall.svg';
import { kyccategories } from '@utils/mocks';

const UpdateKyc = () => {

    const { handleSubmit, handleClearError, handleChange, handleExtraChange, stateValues, files, setCategory,
        fileInputRef, handleFileInputClick, handleChangeFile, handleClearFiles } = UpdateKYCController()

    const { stateValues: profileStateValues } = UsersProfileController()

    return (
        <SettingsProfileLayout>

            <div className="my-20">

                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-medium">
                        Download the KYC document here
                    </h1>
                    <a href={""} className={`font-nunito bg-darkslateblue px-8 py-3 rounded-lg border-none text-white text-sm font-600 ${stateValues?.isDisabled && "cursor-not-allowed"
                        } hover:opacity-80`}
                        download="Download-file"
                        rel="noreferrer">Download Questionnaire
                    </a>

                </div>
                <p className="text-sm font-semibold">
                    {`To facilitate a seamless onboarding process for your business on our finance platform, we kindly request the following documents (Certificate of Incorporation, Register of Shareholders, Register of Directors, Memorandum and Articles of Association, Valid Identification of Directors, Valid Identification of Ultimate Beneficial owner, Operating License  (if applicable) and Vestrapay Due Diligence Questionnaire) and information. Please ensure that you provide all necessary documentation to expedite the setup of your account and access to our financial services.`}
                </p>
                <hr className="h-px mt-5 bg-[#382C7C50] border-0" />
                <div className="flex flex-row my-5 gap-5 w-full items-center justify-center">
                    <div className="flex flex-col w-1/3 mb-10">
                        <span className="text-base font-medium my-5">
                            {`Please select a document to upload:`}
                        </span>
                        {kyccategories && kyccategories?.map((each: any, i: any) => {
                            return (
                                <div style={{
                                    borderRadius: "1px",
                                    border: "1px solid #F0F0F0"
                                }} key={i} className={` gap-10 w-full h-fit relative flex py-5 items-center hover:bg-gray-100 cursor-pointer
                                ${stateValues?.category == each?.name ? "bg-gray-200" : ""} `} onClick={() => { handleExtraChange("category", each?.name || ""); setCategory(each?.value || ""); }} >
                                    <div className="w-full sm:col-span-5 col-span-2 px-5 flex flex-row justify-between gap-2">
                                        <span className="text-neutral-700 text-base font-semibold font-['Nunito'] w-4/5">{each?.name || ""}</span>
                                        {profileStateValues?.requiredDocuments.includes(each?.value) && <BsCheckCircleFill color={"green"} size={20} className='w-1/5' />}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-col my-5 gap-5 w-full items-center justify-center">
                        <div>
                            <div className='flex flex-col my-5 w-full items-center justify-center'>
                                <h1 className="text-xl font-medium m-0">
                                    {`Please Upload ${stateValues?.category || "KYC"}`}
                                </h1>
                                <p className="text-sm text-[#03022950] font-extralight">Upload your filled Vestrapay Due Diligence Questionnaire and all other required document here</p>
                            </div>

                            <div className="flex items-center justify-center w-full mb-5">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-fit h-fit rounded-lg cursor-pointer flex-wrap">
                                    <div className='h-fit w-fit m-0 p-0 rounded-xl shadow-[0px_2px_20px_rgba(100,108,156,0.125)] bg-[#ffffff00] flex flex-col justify-between'>
                                        {files && files?.length < 1 ? <img src={'/assets/svg/uploadFile.svg'} alt="" className="h-auto max-w-full" />//<UploadFile/> 
                                            : <img src={'/assets/svg/uploadFileSmall.svg'} alt="" className="h-auto max-w-full" /> //<UploadFileSmall/>
                                        }
                                    </div>

                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleChangeFile} />
                                </label>
                            </div>

                            {files && files?.length > 0 ?
                                files?.map((each: any, i: any) => {

                                    return <div className='h-fit rounded-lg flex flex-row justify-between border border-gray-200' key={i}>
                                        <p className=' w-fit text-base font-400 flex gap-5 items-center px-5 py-0'>
                                            <span><BsFileEarmarkImage color="382C7C" size={25} /></span>
                                            {each?.name || "File"}</p>
                                        <p className='text-gray-400 w-fit text-base font-400 flex gap-5 items-center px-5 py-0'>{each?.size / 1000000 || "0"} MB</p>
                                    </div>
                                })
                                : null
                            }
                        </div>
                        <div className='flex flex-col sm:flex-row gap-2 justify-center w-full'>
                            <button onClick={handleClearFiles} className={`font-nunito  px-8 py-3 rounded-lg bg-[#ffffff] text-darkslateblue border border-darkslateblue cursor-pointer text-sm font-600 hover:opacity-80`}
                                rel="noreferrer">Cancel
                            </button>
                            <DefaultButton
                                labelText="Upload Document"
                                isLoading={stateValues?.isSubmitting}
                                handleClick={handleSubmit}
                                variant={"bg-selected cursor-pointer w-1/2 sm:w-fit"}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </SettingsProfileLayout >
    );
};

export default UpdateKyc;