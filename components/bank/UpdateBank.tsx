import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Modal from '../modal/Modal'
import { DefaultButton, DefaultInput } from '../reusables'
import { LoginErrorCard } from 'Utils/actions/error'
import Switch from "react-switch";
import { updateController } from 'containers/banksApi'


export default function UpdateBank({ show, showModal, data }: any) {

    const [state, setState] = useState<any>({
        cbnCode: "",
        name: "",
        nipCode: "",
        enabled: true,
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })

    const [allowSubmit, setSubmit] = useState(true)
    const [select, setSelect] = useState<any>(null)

    const {
        name,
        cbnCode,
        nipCode,
        enabled, errorMssg, isSubmitting, submittingError } = state

    const { handleSubmit, handleChange, handleExtraChange } = updateController(state, setState, showModal, data)


    return (

        <Modal show={show} clicked={() => { showModal(); setSelect(null) }}>
            <div className='m-3 flex flex-row gap-3 -ml-3 sm:ml-3'>
                <div className="flex gap-5">
                    <button onClick={() => { showModal(); setSelect(null) }} className=" h-[50px] rounded-[200px] bg-white-ghost p-4">
                        <FaArrowLeft className='text-primary-blue font-600' />
                    </button>
                    <div>
                        <p className=' w-fit text-2xl font-700 text-gray-200'>Bank Details</p>
                        <p className='text-gray-400 w-fit text-base font-300 leading-7 mt-3'>Below are the details of the Bank</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-row gap-8 justify-around items-start md:max-w-[50vw] mb-10'>
                <div className=' w-3/4 relative'>

                    <DefaultInput
                        type="text"
                        name="name"
                        value={name}
                        label={"Bank Name"}
                        topLabel={"Bank Name"}
                        handleChange={handleChange}
                        placeholder="Bank Name"
                        containerVariant="mt-5"
                    />
                    <DefaultInput
                        type="text"
                        name="cbnCode"
                        value={cbnCode}
                        label={"CBN Code"}
                        topLabel={"CBN Code"}
                        handleChange={handleChange}
                        placeholder="CBN Code"
                        containerVariant="my-5"
                    />
                    <DefaultInput
                        type="text"
                        name="nipCode"
                        value={nipCode}
                        label={"NIP Code"}
                        topLabel={"NIP Code"}
                        handleChange={handleChange}
                        placeholder="NIP Code"
                        containerVariant="my-5"
                    />
                    <div className="flex items-cw-full gap-5 space-x-4 my-5">
                        <p className='text-gray-200'>Enabled</p>
                        <Switch
                            onChange={(checked: any) => { setState({ ...state, enabled: checked }) }}
                            checked={enabled}
                            checkedIcon={true}
                            offColor="#3b4762"
                            onColor="#2362D7"
                            disabled={false}
                            className="border border-gray-600"
                        />
                    </div>
                    

                    <LoginErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
                    <div className=" flex flex-row my-5 w-full sm:flex-row justify-citems-center">
                        <DefaultButton
                            labelText="Update Institution"
                            isLoading={isSubmitting}
                            handleClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
            {/* </div> */}
        </Modal >
    )
}