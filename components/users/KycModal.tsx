import React, { useState } from "react";
import Modal from "../modal/Modal";
import { DefaultButton, DefaultInput, DefaultSelect } from "../reusables";
import { LgQuestionModalIcon } from "../reusables/icons";
import { LoginErrorCard } from "@utils/actions/error";
import router from "next/router";
import { useNewTransContext } from "context/transactionContext";
import { Storage } from "@utils/inAppstorage";
import { ComplianceController } from "containers/complianceApi";

export default function KycModal({
    show,
    setShow,
    data
}: any) {

    const { details } = Storage.getItem("userDetails") || {}

    const { handleDownload, handleValidate, stateValues, handleChange } = ComplianceController(data);

    return (
        <Modal show={show} clicked={setShow}>
            <div className="flex flex-row gap-8 justify-around items-start max-w-[75vw] mb-10">
                <div className=" min-w-[25vw] overflow-none w-11/12 relative">
                    <div className=" flex flex-col my-5 w-full justify-center items-center">
                        <div className="my-3 flex justify-center items-center">
                            <LgQuestionModalIcon />
                        </div>
                        <div className="my-3 flex flex-col gap-5">
                            <p className=" w-full text-2xl font-700 text-center">
                                Approve or disapprove documents
                            </p>
                        </div>

                        <DefaultSelect
                            name="status"
                            label="Status"
                            topLabel="Status"
                            value={stateValues?.status}
                            placeHolder="Enter Status"
                            containerVariant="w-full py-2"
                            handleChange={handleChange}
                            data={[{ id: 1, name: "Pending", value: "PENDING" }, { id: 1, name: "Approve", value: "APPROVED" }, , { id: 1, name: "Decline", value: "DECLINE" }]}
                        />

                        <DefaultInput
                            type="tel"
                            name="reason"
                            label="Reason"
                            topLabel="Reason"
                            placeHolder="Enter Reason"
                            containerVariant="w-full py-2"
                            value={stateValues?.reason}
                            handleChange={handleChange}
                        />

                        <div className="my-3 flex flex-col sm:flex-row gap-5 justify-center items-center ">
                            <DefaultButton
                                labelText="Continue"
                                handleClick={handleValidate}
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
