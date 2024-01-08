import React from "react";
import Modal from "../modal/Modal";
import { DefaultButton } from "../reusables";
import { LgQuestionModalIcon } from "../reusables/icons";
import { enableUsersController } from "containers/usersApi";
import { LoginErrorCard } from "@utils/actions/error";

export default function DeleteUser({
    show,
    setShow,
    data
}: any) {

    const { stateValues, handleSubmit, handleClearError } = enableUsersController(data)

    return (
        <Modal show={show} clicked={setShow}>
            <div className="flex flex-row gap-8 justify-around items-start max-w-[50vw] mb-10">
                <div className=" w-11/12 relative">
                    <div className=" flex flex-col my-5 w-full justify-center items-center">
                        <div className="my-3 flex justify-center items-center">
                            <LgQuestionModalIcon />
                        </div>
                        <div className="my-3 flex flex-col gap-5">
                            <p className=" w-full text-2xl font-700 text-center">
                                {data?.enabled ? "Disable User" : "Enable User"}
                            </p>
                            <p className="text-gray-900 w-full text-base font-300 leading-7 mt-3 text-center">
                                {data?.enabled ? "Are you sure you want to disable this user?" : "Are you sure you want to enable this user?"}
                            </p>
                        </div>
                        <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""} containerVariant={!stateValues?.submittingError ? "hidden" : ""} />

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
