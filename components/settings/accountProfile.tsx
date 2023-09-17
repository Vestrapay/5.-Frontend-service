import React from 'react';
import { SmUpdateIcon } from '../reusables/icons';

function AccountProfile() {
    return (

        <div className="relative w-full h-full bg-primary-white px-28 py-20 flex flex-col gap-8 rounded-xl backdrop-blur-sm">

            <div className=" w-full flex justify-between items-center gap-5 mb-8">
                <div className=''>
                    <p className=' w-fit text-xl font-600 text-black-midnight'>Profile Information</p>
                </div>
                <div>
                    <button onClick={() => null} className='bg-primary-blue rounded-lg text-primary-white  text-sm font-600 flex items-center gap-4'>
                        <span className='pl-6 pr-1 py-3 font-500'>Update</span>
                        <span><SmUpdateIcon /></span>
                    </button>
                </div>
            </div>
            <div className="w-5/6 flex flex-col gap-8 ">
                <div className="flex flex-row gap-5 w-full mt-6">
                    <p className=' w-fit text-lg font-500 text-gray-500'>Business Information</p>
                </div>

                <div className="flex flex-row gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full" >
                        <label>Business Name</label>
                        <input placeholder='Enter business name' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                    <div className="flex flex-col gap-2 w-full" >
                        <label>Business Description</label>
                        <input placeholder='Enter business description' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                </div>
                <div className="flex flex-row gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full" >
                        <label>Business Category</label>
                        <input placeholder='Enter business category' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                </div>
                <div className="flex flex-row gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full" >
                        <label>Business Email Address</label>
                        <input placeholder='Enter business email' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                </div>
                <div className="flex flex-row gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full" >
                        <label>Business Phone Number</label>
                        <input placeholder='Enter business phone number' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                </div>

                <div className="flex flex-row gap-5 w-full mt-6">
                    <p className=' w-fit text-lg font-500 text-gray-500'>Personal Information</p>
                </div>

                <div className="flex flex-row gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full" >
                        <label>Full Name</label>
                        <input placeholder='Enter your full name' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                </div>
                <div className="flex flex-row gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full" >
                        <label>Personal Email Address</label>
                        <input placeholder='Enter your email' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                </div>
                <div className="flex flex-row gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full" >
                        <label>Role</label>
                        <input placeholder='Edit your role' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                </div>
                <div className="flex flex-row gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full" >
                        <label>Aggregator</label>
                        <input placeholder='Edit your aggregator' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                </div>

                <div className="flex flex-row gap-5 w-full mt-6">
                    <p className=' w-fit text-lg font-500 text-gray-500'>Personal Information</p>
                </div>

                <div className="flex flex-row gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full" >
                        <label>Business Address</label>
                        <input placeholder='Enter your business address' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                </div>
                <div className="flex flex-row gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full" >
                        <label>State</label>
                        <input placeholder='Enter your state' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                </div>
                <div className="flex flex-row gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full" >
                        <label>LGA</label>
                        <input placeholder='Enter your LGA' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                    <div className="flex flex-col gap-2 w-full" >
                        <label>Closest Bus-Stop/Landmark</label>
                        <input placeholder='Enter Closest Bus-Stop/Landmark' className=' placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountProfile