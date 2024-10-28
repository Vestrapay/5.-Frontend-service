import type { NextPage } from "next";
import Cardnumberinput19f2b12dsvg1 from "@assets/svg/cardnumberinput19f2b12dsvg1.svg"
import { DateField } from '@mui/x-date-pickers/DateField';
import { LoginErrorCard } from "@utils/actions/error";
import { DefaultButton, DefaultInput } from "@/components/reusables";
import { PayWithCardIcon, PayWithUSSDIcon } from "@/components/reusables/icons";
import { HiBuildingLibrary, HiCreditCard, HiMiniHashtag, HiMiniLink, HiMiniXMark } from "react-icons/hi2";
import router from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { paymentGatewayController } from "containers/paymentGatewayApi";
import { LayoutProps } from "@types";
import PaymentGatewayLayout from "@/components/payment/PaymentGatewayLayout";
import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { BsFillExclamationTriangleFill, BsXSquare } from "react-icons/bs";
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';
import { useNewTransContext } from "context/transactionContext";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import React from "react";

// Random component
const Completionist = (value: any) => {
    return (
        <div className="w-full h-max bg-neutral-100 rounded-md border border-stone-500 border-opacity-20 flex-col justify-center items-center flex  pt-11 pb-11">
            <div className="h-max p-10 pt-5 flex-col justify-center items-center gap-2 flex">
                <div>
                    <BsFillExclamationTriangleFill size={75} />
                </div>
                <div className="h-max pt-2 flex-col  justify-center items-center gap-1 flex">
                    <div className="text-neutral-600 text-2xl font-normal font-['Roboto'] leading-tight tracking-wide  text-center ">{`Transaction ${value?.value?.toLowerCase() || "Unfulfilled"}`}</div>
                    <div className="w-full pt-1 justify-center items-center inline-flex">
                        <div className=" justify-center items-center flex">
                            <div className=" font-base font-['Roboto'] leading-loose text-zinc-500 text-base text-center ">
                                Your window to complete this transaction has elapsed.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
};

let second = 0;

const TransferPaymentGateway: NextPage = () => {

    const [open, setOpen] = React.useState(false);
    const [first, setfirst] = useState<number>(0);
    const [countDone, setCountDone] = useState<boolean>(false);

    const { handleInitiateTransfer, transferDetails, handleClearError, handleChange, handleExtraChange, stateValues, handleTSQ, closeModal } = paymentGatewayController("transfer")

    const { account_name, account_number, bank_code, bank_name } = transferDetails;

    const { initiatedTrans } = useNewTransContext()
    console.log(stateValues?.transferSentError)
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    React.useEffect(() => {

        if ((stateValues?.transactionStatus && stateValues?.transactionStatus === "PROCESSING") || (!initiatedTrans?.transfer?.payed && initiatedTrans?.transfer?.status === "PROCESSING")) {
            setOpen(true);
        }
    }, [stateValues?.transactionStatus, initiatedTrans?.transfer?.status]);

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <BsXSquare size={25} />
            </IconButton>
        </React.Fragment>
    );

    return (
        <PaymentGatewayLayout>

            <div className="w-full h-6 justify-center items-center inline-flex">
                {!stateValues?.transferSent && <p className="text-center text-neutral-600 text-lg font-normal font-['Roboto'] leading-normal py-12">Complete this transfer on your bank app.</p>}
            </div>
            {
                <form className="flex flex-wrap gap-3 w-full">
                    <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""} containerVariant={!stateValues?.submittingError ? "hidden" : "mx-14"} />
                    <div className="flex flex-wrap gap-10 w-full">

                        {stateValues?.transferSent || initiatedTrans?.transfer?.payed ?
                            <div className="w-full h-max rounded-md border border-stone-500 border-opacity-20 flex-col justify-center items-center flex  pt-11 pb-6">
                                <div className="h-max p-10 pt-5 flex-col justify-center items-center gap-2 flex">
                                    <div>
                                        <img className="w-28 h-28" src="/assets/successGif.gif" />
                                    </div>
                                    <div className="h-max pt-2 flex-col  justify-center items-center gap-1 flex">
                                        <div className="text-neutral-600 text-2xl font-normal font-['Roboto'] leading-tight tracking-wide text-center ">Transaction Successful</div>
                                        <div className="w-full pt-1 mb-2 justify-center items-center inline-flex">
                                            <div className=" justify-center items-center flex">
                                                <div className=" font-base font-['Roboto'] leading-loose text-zinc-500 text-base text-center ">
                                                    Redirecting you back to the previous page.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            stateValues?.transferSentError ?
                                <div className="w-full h-max bg-neutral-100 rounded-md border border-stone-500 border-opacity-20 flex-col justify-center items-center flex  pt-11 pb-11">
                                    <div className="h-max p-10 pt-5 flex-col justify-center items-center gap-2 flex">
                                        <div>
                                            <BsFillExclamationTriangleFill size={75} />
                                        </div>
                                        <div className="h-max pt-2 flex-col  justify-center items-center gap-1 flex">
                                            <div className="text-neutral-600 text-2xl font-normal font-['Roboto'] leading-tight tracking-wide  text-center ">Unsuccessful Transaction</div>
                                            <div className="w-full pt-1 justify-center items-center inline-flex">
                                                <div className=" justify-center items-center flex">
                                                    <div className=" font-base font-['Roboto'] leading-loose text-zinc-500 text-base text-center ">
                                                        We couldn't complete your transaction right now, please try again later.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                stateValues?.initiated ?
                                    !countDone ?
                                        <>
                                            <div className="w-full h-max px-px pt-11 pb-5 bg-neutral-100 rounded-md border border-stone-500 border-opacity-20 flex-col justify-start items-start gap-7 inline-flex">
                                                <div className="h-16 px-10 pt-2 flex-col justify-start items-start gap-1 flex">
                                                    <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-tight tracking-wide">AMOUNT</div>
                                                    <div className="w-full pt-1 justify-start items-start inline-flex">
                                                        <div className="pr-1 justify-start items-start flex">
                                                            <div className="text-neutral-600 text-2xl font-bold font-['Roboto'] leading-loose">
                                                                <CurrencyFormat value={stateValues?.amount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"NGN "} />
                                                            </div>
                                                        </div>
                                                        <div className="pl-5" />
                                                    </div>
                                                </div>
                                                <div className="h-16 px-10 pt-2 flex-col justify-start items-start gap-1 flex">
                                                    <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-tight tracking-wide">ACCOUNT NUMBER</div>
                                                    <div className="w-full pt-1 justify-start items-start inline-flex">
                                                        <div className=" justify-start items-start flex">
                                                            <div className="text-neutral-600 text-2xl font-bold font-['Roboto'] leading-loose">{account_number || ""}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="h-16 px-10 pt-2 flex-col justify-start items-start gap-2 flex">
                                                    <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-tight tracking-wide">ACCOUNT NAME</div>
                                                    <div className="text-neutral-600 text-2xl font-bold font-['Roboto'] leading-loose">{`${account_name}`}</div>
                                                </div>
                                                <div className="h-16 px-10 pt-2 flex-col justify-start items-start gap-2 flex">
                                                    <div className="text-zinc-500 text-base font-normal font-['Roboto'] leading-tight tracking-wide">BANK NAME</div>
                                                    <div className="text-neutral-600 text-2xl font-bold font-['Roboto'] leading-loose">{`${bank_name}`}</div>
                                                </div>
                                                <div className="w-full pt-5 border-t border-gray-200 justify-start items-start inline-flex">
                                                    <div className="h-6 px-10 justify-start items-start flex">
                                                        <div className="text-stone-500 text-lg font-normal font-['Roboto'] leading-normal">Use these details for this transaction only. </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" w-full px-10 justify-center items-center flex">
                                                <Countdown
                                                    key={stateValues?.countKey}
                                                    date={Date.now() + 598000}
                                                    onTick={(data: any) => {
                                                        if (data?.minutes) {
                                                            setfirst(data?.minutes);
                                                            if (first > data?.minutes) {
                                                                console.log("transfer timer: ", first);
                                                                setfirst(data?.minutes);
                                                                handleTSQ(false);
                                                            }
                                                        }
                                                    }}
                                                    renderer={({ hours, minutes, seconds, completed }: any) => {

                                                        if (completed) {
                                                            setCountDone(true);
                                                            handleTSQ(false);
                                                            // Render a completed state
                                                            return <span></span>
                                                        } else {
                                                            // Render a countdown
                                                            return <>
                                                                <span className="text-stone-500 text-lg font-normal font-['Roboto'] leading-normal">{`This will expire in: `}&nbsp;</span>
                                                                <span className="text-stone-500 text-lg font-normal font-['Roboto'] leading-normal"> {zeroPad(minutes)}:{zeroPad(seconds)}</span>
                                                            </>
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </> : <Completionist value={stateValues?.transferingStatus || "Unfulfilled"} />
                                    : stateValues?.isSubmitting || stateValues?.isSubmittingTrans ?
                                        <div className="w-full h-max bg-neutral-100 rounded-md border border-stone-500 border-opacity-20 flex-col justify-center items-center flex  pt-11 pb-5">
                                            <div className="h-max w-full p-10 pt-3 flex-col justify-center items-center gap-10 flex">
                                                <PropagateLoader color="#3F2F7F50" />

                                                <span className="font-base font-['Roboto'] leading-loose text-zinc-500 text-base text-center w-full">
                                                    Initiating transaction
                                                </span>
                                            </div>
                                        </div>
                                        :
                                        <div className="w-full h-max bg-neutral-100 rounded-md border border-stone-500 border-opacity-20 flex-col justify-center items-center flex  pt-11 pb-11">
                                            <div className="h-max p-10 pt-5 flex-col justify-center items-center gap-2 flex">
                                                <div>
                                                    <BsFillExclamationTriangleFill size={75} />
                                                </div>
                                                <div className="h-max pt-2 flex-col  justify-center items-center gap-1 flex">
                                                    <div className="text-neutral-600 text-2xl font-normal font-['Roboto'] leading-tight tracking-wide text-center ">{stateValues?.errorMssg}</div>
                                                    <div className="w-full pt-1 justify-center items-center inline-flex">
                                                        <div className=" justify-center items-center flex">
                                                            <div className=" font-base font-['Roboto'] leading-loose text-zinc-500 text-base text-center ">
                                                                We couldn't initiate your transaction right now, please try again later.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                        }

                    </div>
                    <div className="w-full flex flex-row justify-center items-center">
                        {stateValues?.initiated && !stateValues?.transferSentError && !stateValues?.transferSent && !initiatedTrans?.transfer?.payed ?
                            <DefaultButton
                                labelText={"Payment Completed"}
                                containerVariant="w-max p-3 my-5 text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                                variant="w-full p-3 text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                                isLoading={stateValues?.isSubmitting}
                                handleClick={(e: any) => handleTSQ(true)}
                                isDisabled={stateValues?.isDisabled}
                            />
                            : !stateValues?.transferSent && !initiatedTrans?.transfer?.payed ?
                                <DefaultButton
                                    labelText={"Re check"}
                                    containerVariant="w-max p-3 my-5 text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                                    variant=" w-full p-3 uppercase text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                                    isLoading={stateValues?.isSubmitting}
                                    // handleClick={handleInitiateTransfer}
                                    handleClick={(e: any) => handleTSQ(true)}
                                    isDisabled={stateValues?.isDisabled}
                                /> : initiatedTrans?.transfer?.payed ?
                                    <DefaultButton
                                        labelText={"Click to go back"}
                                        containerVariant="w-max p-3 my-5 text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                                        variant=" w-full p-3 uppercase text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                                        isLoading={stateValues?.isSubmitting}
                                        // handleClick={handleInitiateTransfer}
                                        handleClick={closeModal}
                                        isDisabled={stateValues?.isDisabled}
                                    />
                                    :
                                    <DefaultButton
                                        labelText={"Re check"}
                                        containerVariant="w-max p-3 my-5 text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                                        variant=" w-full p-3 uppercase text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                                        isLoading={stateValues?.isSubmitting}
                                        // handleClick={handleInitiateTransfer}
                                        handleClick={(e: any) => handleTSQ(true)}
                                        isDisabled={stateValues?.isDisabled}
                                    />
                        }
                    </div>

                </form>
            }
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={stateValues?.transactionStatus === "PROCESSING" || initiatedTrans?.transfer?.status === "PROCESSING" ? "Transfer still in progress..." : "Checking..."}
                action={action}
            />
        </PaymentGatewayLayout>
    );
};

export default TransferPaymentGateway;
