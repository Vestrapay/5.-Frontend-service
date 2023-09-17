import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { SmCheckIcon, SmHourGlassIcon, SmWarningIcon } from '../reusables/icons';


function CompleteOnboarding({ showUpdateIdenModal, showUpdateBussModal }: any) {


    return (
        <>
            <div className="relative w-full h-full bg-primary-white px-28 pt-20 pb-24 flex flex-col gap-8 rounded-xl backdrop-blur-sm">

                <div className=" w-full flex justify-start items-center gap-5 mb-8">
                    <div className=''>
                        <p className=' w-fit text-xl font-600 text-black-midnight'>Complete Onboarding ( 1 of 3)</p>
                    </div>
                </div>
                <div className="w-6/12 flex flex-col gap-8 ">
                    <div className='flex items-center gap-8 py-6 px-10 shadow-sm rounded-xl w-full'>
                        <div>
                            <SmCheckIcon />
                        </div>
                        <div>
                            <p className='w-fit text-base font-500 pb-2'>
                                <span className='text-gray-400 mr-1'>{`Update Password`}</span>
                            </p>
                            <p className='w-fit text-sm font-300 '>
                                <span className='text-gray-300 mr-1'>Update your profile Security</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-6/12 flex flex-col gap-8 ">
                    <div onClick={showUpdateIdenModal} className='cursor-pointer flex items-center gap-8 py-6 px-10 shadow-sm rounded-xl w-full'>
                        <div>
                            <SmHourGlassIcon />
                        </div>
                        <div>
                            <p className='w-fit text-base font-500 pb-2'>
                                <span className='text-blue-midnight mr-1'>{`Means of Identification`}</span>
                            </p>
                            <p className='w-fit text-sm font-300 '>
                                <span className='text-gray-400 mr-1'>Submitted-Under Review</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-6/12 flex flex-col gap-8 ">
                    <div onClick={showUpdateBussModal} className='cursor-pointer flex items-center gap-8 py-6 px-10 shadow-sm rounded-xl w-full'>
                        <div>
                            <SmWarningIcon />
                        </div>
                        <div>
                            <p className='w-fit text-base font-500 pb-2'>
                                <span className='text-blue-midnight mr-1'>{`Business Registration Documents`}</span>
                            </p>
                            <p className='w-fit text-sm font-300 '>
                                <span className='text-gray-400 mr-1'>Not Uploaded</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompleteOnboarding