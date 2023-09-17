import router from "next/router";
import React, { useEffect, useState } from "react";
import { Storage } from "Utils/inAppstorage";
import { SmLightFlagIcon } from "../reusables/icons";
import { BsX } from 'react-icons/bs'


const NewUserStatus = ({ showModal }: any) => {

    const { onboardingStage } = Storage.getItem("onboardingStage") || {}

    const [stageUrl, setStageUrl] = useState("")

    const [stage, setStage] = useState("")

    useEffect(() => {
        if (onboardingStage == "create_merchant") {
            setStageUrl("/create-account?stage=pin")
        } else if (onboardingStage == "secure_account") {
            setStageUrl("/create-account?stage=bvn")
        } else if (onboardingStage == "bvn") {
            setStageUrl("/create-business/corporate?stage=profile")
        } else if (onboardingStage == "business_profile") {
            setStageUrl("/create-business/corporate?stage=verifyemail")
        } else if (onboardingStage == "verify_business_email") {
            setStageUrl("/create-business/corporate?stage=verifyphone")
        } else if (onboardingStage == "verify_phone") {
            setStageUrl("/create-business/corporate?stage=location")
        } else if (onboardingStage == "set_up_location") {
            setStageUrl("/create-business/corporate?stage=bvn")
        } else if (onboardingStage == "directors_details") {
            setStageUrl("/create-business/corporate?stage=addBank")
        }
        else if (onboardingStage == "uploadId") {
            setStageUrl("/create-business/corporate?stage=uploadId")
        } else if (onboardingStage == "uploadDoc") {
            setStageUrl("/create-business/corporate?stage=uploadDoc")
        }
        else if (onboardingStage == "settlement") {
            setStageUrl("/create-business/corporate?stage=addBank")
        } else {
            setStageUrl("")
        }
        if (onboardingStage == "create_merchant") {
            showModal("/create-account?stage=pin")
        }

        setStage(onboardingStage)
    }, [onboardingStage])

    if (stage == "create_merchant") {
        return (
            <div>
                <div className="w-fit flex flex-row justify-between gap-2 items-center p-3 px-5 rounded-lg cursor-pointer bg-[#FFFAF0] text-sm font-400">
                    <span className="pr-1"><SmLightFlagIcon prop={"#FFAA09"} /></span>
                    <span>Your registration is not yet completed</span>
                    <span className="text-primary-blue" onClick={() => showModal(stageUrl)}>Continue</span>
                    <span className="text-gray-500 text-sm font-500 px-2">Not Started</span>
                    <span onClick={() => setStage("")}><BsX size={20} color="#FFAA09" /></span>
                </div>
            </div>
        )
    } else if (stage == "" || stage == "settlement" || !stageUrl) {
        return <span></span>
    }
    else {
        return (
            <div>
                <div className="w-fit flex flex-row justify-between gap-2 items-center p-3 px-5 rounded-lg cursor-pointer bg-[#FFFAF0] text-sm font-400">
                    <span className="pr-1"><SmLightFlagIcon prop={"#FFAA09"} /></span>
                    <span>Your registration is not yet completed</span>
                    <span className="text-primary-blue" onClick={() => router.push(stageUrl)}>Continue</span>
                    <span className="text-gray-500 text-sm font-500 px-2 pr-3">Not completed</span>
                    <span onClick={() => setStage("")}><BsX size={20} color="#FFAA09" /></span>
                </div>
            </div>
        )
    }
}

export default NewUserStatus;