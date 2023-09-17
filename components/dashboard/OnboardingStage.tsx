import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Modal from '../modal/Modal'
import Image from 'next/image'
import router from 'next/router'
import { DefaultButton, DefaultInput } from '../reusables'
import { apiCall } from 'Utils/URLs'
import { LoginErrorCard } from 'Utils/actions/error'
import { notify } from 'Utils/actions/toaster'
import { LightCloseIcon } from '../reusables/icons'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Storage } from 'Utils/inAppstorage'

export default function OnboardingStage({ stage, show, showModal }: any) {

    const { onboardingStage, firstName, lastName } = Storage.getItem("userDetails") || { onboardingStage: "", firstName: "", lastName: "" }

    const [state, setState] = useState<any>({
        name: "",
    })

    useEffect(() => {
        setState({ ...state, name: `${firstName} ${lastName}` })
    }, [firstName, lastName])


    const { name } = state

    //Handle assertions functions

    return (

        <Modal show={show} clicked={showModal}>
            <div className='w-full m-3 flex flex-row gap-3 px-5'>
                <div className="flex w-full justify-between ">
                    <Image src={'/assets/svg/medusaLogo.svg'} alt="" width={125} height={100} />
                    <div className="cursor-pointer" onClick={showModal}><LightCloseIcon /></div>
                </div>
            </div>
            <div className='flex flex-col min-w-[50vw] w-full justify-around items-start max-w-11/12 p-5 gap1'>
                <p className=' w-fit text-xl font-100 '>Welcome to</p>
                <p className=' w-fit text-xl font-700 '>Medusa Merchants ✌️</p>
            </div>
            <div className='flex flex-col min-w-[50vw] w-full justify-around items-start max-w-9/12 p-5 gap1'>
                <p className=' w-fit text-sm font-100 '>{`Hello ${name} Please pay attention to the steps requried to take after loggin in.`}</p>
                <p className=' w-fit text-sm font-100 '>You will need to complete them to gain access to the portal.</p>
                <ul className='list-disc pl-10 text-sm py-2 max-w-2/3 w-full'>
                    <li className='w-fit max-w-1/3 text-wrap word-wrap'>Start by creating your transaction pin.</li>
                    <li className='w-fit max-w-2/3 text-wrap word-wrap'>Upon Pin creation, go ahead to add and verify your BVN with your linked <br />phone number.</li>
                    <li className='w-fit max-w-2/3 text-wrap word-wrap'>Upon verification, you will be prompted to select business category and <br />fill the necessary details.</li>
                </ul>
            </div>
            <div className='flex flex-col min-w-[50vw] w-full justify-around items-start max-w-11/12 p-5 gap1'>
                <p className=' w-fit text-sm font-500 flex gap-2 items-center'>1. Create Account <BsFillCheckCircleFill color={"#50D39C"} size={18} /> </p>
            </div>
            <div className='flex flex-col min-w-[50vw] w-full justify-center items-center py-10 gap1'>
                <Image src={'/assets/svg/onboardingStage.svg'} alt="" width={500} height={200} />
            </div>
            <div className='flex flex-col min-w-[50vw] w-full justify-center items-center pb-10 '>
                <DefaultButton
                    labelText="Continue Business Setup"
                    handleClick={() => router.push(stage)}
                />
            </div>
        </Modal >
    )
}
