import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs'

function AccountSettings({ showModal }: any) {


    return (
        <>
            <div className="relative w-full h-full bg-primary-white px-28 pt-20 pb-24 flex flex-col gap-8 rounded-xl backdrop-blur-sm">

                <div className=" w-full flex justify-start items-center gap-5 mb-8">
                    <div className=''>
                        <p className=' w-fit text-xl font-600 text-black-midnight'>Settings</p>
                    </div>
                </div>
                <div className="w-6/12 flex flex-col gap-8 ">
                    <div className='flex items-center justify-between py-6 px-10 border border-lg rounded-xl w-full'>
                        <div>
                            <p className='w-fit text-base font-500 pb-2'>
                                <span className='text-blue-midnight mr-1'>{`Update Password`}</span>
                            </p>
                            <p className='w-fit text-sm font-300 '>
                                <span className='text-gray-400 mr-1'>Update your profile Security</span>
                            </p>
                        </div>
                        <div>
                            <button onClick={showModal} className=" h-full rounded-full bg-blue-light p-3">
                                <BsArrowRight className='w-5 h-5 text-primary-blue font-600 text-lg' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountSettings