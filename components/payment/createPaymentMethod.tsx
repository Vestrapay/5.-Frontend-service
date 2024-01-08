import React from "react";
import Modal from "../modal/Modal";
import { DefaultButton, DefaultInput } from "../reusables";
import { Storage } from "@utils/inAppstorage";
import { createPayMethodController } from "containers/paymentMethodApi";
import { LoginErrorCard } from "@utils/actions/error";

export default function CreatePaymentMethod({
    show,
    setShow,
    data
}: any) {

    const { details } = Storage.getItem("userDetails") || {}

    const { stateValues, handleChange, handleSubmit, handleClearError } = createPayMethodController(data);

    return (
        <Modal show={show} clicked={setShow}>
            <div className="flex flex-row gap-8 justify-around items-start max-w-[75vw] mb-10">
                <div className=" min-w-[25vw] overflow-none w-11/12 relative">
                    <div className=" flex flex-col my-5 w-full justify-center items-center">
                        <div className="my-3 flex flex-col gap-5">
                            <p className=" w-full text-2xl font-700 text-center">
                                Create a new Payment Method
                            </p>
                        </div>

                        <DefaultInput
                            type="tel"
                            name="payMethod"
                            label="Payment Method"
                            topLabel="Payment Method"
                            placeHolder="Enter Payment Method"
                            containerVariant="w-full py-2"
                            value={stateValues?.payMethod}
                            handleChange={handleChange}
                        />

                        <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""}
                            containerVariant={!stateValues?.submittingError ? "hidden" : ""} />

                        <div className="my-3 flex flex-col sm:flex-row gap-5 justify-center items-center ">
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
