import React from "react";
import classNames from "classnames";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";

import styles from "./actions.module.css";
import { SmSuccessModalIcon } from "@/components/reusables/icons";


export const notify = ({ header, details, icon, errors }: any) => {

    let parsedErrors = typeof errors == 'object' ? errors?.map((each: any) => each.error).toString() || "" : ""


    return toast.custom((t) => (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'}
            w-96 max-w-fit w-fit bg-gray-800 shadow-lg rounded-lg 
            pointer-events-auto flex`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <span style={{ width: 10, height: 10 }}>
                            {icon || <HiLightningBolt />}
                        </span>
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-base font-medium text-primary-white">
                            {header || ""}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            <span> {details || ""}</span> <br />
                            <span>
                                {parsedErrors? `errors: ${parsedErrors || ""}` : ""}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex ">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border-transparent rounded-none
                     p-4 flex items-center justify-center text-sm 
                    font-medium text-indigo-600 hover:text-indigo-500 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <MdOutlineClose color="white" size={25} />
                </button>
            </div>
        </div>
    ));
}

        // toast.custom(
    //     (t) => (
    //         <div
    //             className={classNames([
    //                 styles.notificationWrapper,
    //                 t.visible ? "top-0" : "-top-96",
    //             ])}
    //         >
    //             <div className={styles.iconWrapper}>
    //                 <span style={{ width: 10, height: 10 }}>
    //                     {icon || <HiLightningBolt />}
    //                 </span>
    //             </div>
    //             <div className={styles.contentWrapper}>
    //                 <h1>{header || ""}</h1>
    //                 <p>
    //                     {details || ""}
    //                 </p>
    //             </div>
    //             <div className={styles.closeIcon} onClick={() => toast.dismiss(t.id)}>
    //                 <MdOutlineClose color="black" />
    //             </div>
    //         </div>
    //     ),
