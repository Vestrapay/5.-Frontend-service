import React, { useState } from 'react'
import Modal from '../modal/Modal'
import { FaArrowLeft } from 'react-icons/fa'
import Image from 'next/image'

function UpdateBusinessReg({ show, showModal }: any) {

    return (
        <div>
            <Modal show={show} clicked={showModal}>
                <div className=' flex justify-center'>
                    <div className="w-full py-8 pl-4 pr-12  max-w-[700px] h-2/3 flex flex-col items-center justify-center ">

                        <div className="flex flex-row justify-start gap-8 w-full h-full bg-primary-white rounded-xl backdrop-blur-sm ">
                            <div className='w-fit h-fit'>
                                <button onClick={showModal} className=" h-full rounded-full bg-white-ghost p-4">
                                    <FaArrowLeft className='text-primary-blue font-600' />
                                </button>
                            </div>
                            <div className=" w-full h-full flex flex-col justify-between gap-24">
                                <div className="flex flex-col items-center gap-8">
                                    <div>
                                        <p className=' w-fit text-xl font-600 '>Business Registration Document</p>
                                        <p className='text-gray-400  w-fit text-base font-400 leading-7 mt-3'>Please, upload required Business documents below or
                                            <span className='text-primary-blue'> Do this later</span></p>
                                    </div>
                                    <div className="flex flex-row gap-5 w-full">
                                        <div className="flex flex-col gap-2 w-full" >
                                            <label>{`ID Type (Government Issued)`}</label>
                                            <select className='placeholder:text-gray-450 placeholder:text-sm placeholder:min-w-max w-full leading-6 text-base font-400 border px-6 py-5 rounded-lg'>
                                                <option className='text-gray-200 text-xs min-w-max w-full'>Select your type of ID</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-5 w-full">

                                        <div className="flex flex-col gap-4 w-full" >
                                            <label>{`Upload ID Document`}</label>
                                            <div className='h-5/6 p-6 pb-8 rounded-lg shadow-[0px_2px_80px_rgba(100,108,156,0.125)] flex flex-col justify-between'>
                                                <Image src={'/assets/svg/uploadFile.svg'} alt="" width={550} height={500} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <button onClick={showModal} className='bg-primary-blue px-8 py-3 rounded-lg text-primary-white  text-sm font-600 '>Submit Document</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UpdateBusinessReg