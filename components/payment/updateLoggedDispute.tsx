import React from "react";
import Modal from "../modal/Modal";
import { DefaultButton, DefaultInput, DefaultSelect } from "../reusables";
import { Storage } from "@utils/inAppstorage";
import { PayMethodController, createPayMethodController } from "containers/paymentMethodApi";
import { updatePayProvidersController } from "containers/paymentProvidersApi";
import { updateDisputesController } from "containers/disputeResolutionApi";
import { LoginErrorCard } from "@utils/actions/error";

export default function UpdateLoggedDispute({
    show,
    setShow,
    data
}: any) {

    const { details } = Storage.getItem("userDetails") || {}

    const { stateValues, handleChange, handleSubmit, handleClearError } = updateDisputesController(data);

    const { data: payMethodData } = PayMethodController("");

    let statusList =[
        {
            name: "OPENED",
            value: "OPENED"
        },
        {
            name: "PENDING",
            value: "PENDING"
        },
        {
            name: "CLOSED",
            value: "CLOSED"
        }
    ];

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
                            name="reason"
                            label="Reason for update"
                            topLabel="Reason for update"
                            placeHolder="Enter reason"
                            containerVariant="w-full py-2"
                            value={stateValues?.payProvider}
                            handleChange={handleChange}
                        />

                        <DefaultSelect
                            name="status"
                            label="Select Status"
                            topLabel="Select Status"
                            placeHolder="Select Dispute Status"
                            containerVariant="w-full py-2"
                            value={stateValues?.status}
                            handleChange={handleChange}//handleChange
                            data={statusList}
                        />
                        
                        <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""}
                            containerVariant={!stateValues?.submittingError ? "hidden" : ""} />

                        <div className="my-3 w-full flex flex-col sm:flex-row gap-5 justify-center items-center ">
                            <DefaultButton
                                labelText="Submit"
                                handleClick={handleSubmit}
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
