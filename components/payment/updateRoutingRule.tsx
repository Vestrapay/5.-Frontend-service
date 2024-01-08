import React from "react";
import Modal from "../modal/Modal";
import { DefaultButton, DefaultInput, DefaultSelect } from "../reusables";
import { Storage } from "@utils/inAppstorage";
import { PayMethodController, createPayMethodController } from "containers/paymentMethodApi";
import { updatePayProvidersController } from "containers/paymentProvidersApi";

export default function UpdateRoutingRule({
    show,
    setShow,
    data
}: any) {

    const { details } = Storage.getItem("userDetails") || {}

    const { stateValues, handleChange, handleSubmit, selectMethod, payMethods } = updatePayProvidersController(data);

    const { data: payMethodData } = PayMethodController("")

    let methodList = payMethodData?.map((each: any, i: any) => ({ id: i + 1, name: each?.name, value: each?.name }))

    return (
        <Modal show={show} clicked={setShow}>
            <div className="flex flex-row gap-8 justify-around items-start max-w-[75vw] mb-10">
                <div className=" min-w-[25vw] overflow-none w-11/12 relative">
                    <div className=" flex flex-col my-5 w-full justify-start items-start">
                        <div className="my-3 flex flex-col gap-5">
                            <p className=" w-full text-2xl font-700 text-center">
                                Update Payment Provider
                            </p>
                        </div>

                        <DefaultInput
                            type="tel"
                            name="payProvider"
                            label="Payment Provider"
                            topLabel="Provider Name"
                            placeHolder="Enter Provider Name"
                            containerVariant="w-full py-2"
                            value={stateValues?.payProvider}
                            handleChange={handleChange}
                        />

                        <DefaultSelect
                            name="payMethod"
                            multiple={true}
                            label="Select Payment Method"
                            topLabel="Select Payment Method"
                            placeHolder="Payment Methods"
                            containerVariant="w-full py-2"
                            value={stateValues?.payMethod}
                            handleChange={(e: any) => selectMethod(e?.target?.value)}//handleChange
                            data={methodList}
                        />
                        <div className="text-gray-500 text-xs">
                            {payMethods?.length > 0 ? "Selected:" : ""} {payMethods?.map((each: any) => (
                                <span>{each} &nbsp; </span>
                            ))}</div>
                        <div className="my-3 w-full flex flex-col sm:flex-row gap-5 justify-center items-center ">
                        <DefaultButton
                                labelText="Submit"
                                handleClick={(e: any) => { handleSubmit(e); () => setShow(false); }}
                                isLoading={stateValues?.isSubmitting}
                            />
                            <button
                                onClick={() => setShow(false)}
                                className=" h-[50px] rounded-[200px] text-red-500 border-none font-500 p-4"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
