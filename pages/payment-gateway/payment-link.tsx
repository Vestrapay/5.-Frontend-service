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
import successAlert from "@utils/actions/success";


const CardPaymentGateway: NextPage = () => {

    const { handleSubmitLink, handleClearError, handleChange, handleExtraChange, stateValues } = paymentGatewayController();


    return (
        <PaymentGatewayLayout>

            {stateValues?.linkGenerated ?
                <div className="w-full h-max rounded-md border border-stone-500 border-opacity-20 flex-col justify-center items-center flex  pt-11 pb-11">
                    <div className="h-max p-10 pt-5 flex-col justify-center items-center gap-2 flex">
                        <div>
                            <img className="w-28 h-28" src="/assets/successGif.gif" />
                        </div>
                        <div className="h-max pt-2 flex-col  justify-center items-center gap-1 flex">
                            <div className="text-neutral-600 text-2xl font-normal font-['Roboto'] leading-tight tracking-wide text-center ">Generation Successful</div>
                            <div className="w-full pt-1 justify-center items-center inline-flex mb-5">
                                <div className=" justify-center items-center flex">
                                    <div className=" font-base font-['Roboto'] leading-loose text-zinc-500 text-base text-center ">
                                        {/* Redirecting you back to the previous page. */}
                                    </div>
                                </div>
                            </div>
                            <DefaultInput
                                type="text"
                                name="publicKey"
                                isDisabled={true}
                                placeHolder="Payment link"
                                containerVariant="w-full py-5"
                                value={stateValues?.paymentLinkUrl || ""}
                            />
                            <DefaultButton
                                labelText="Click to copy payment link"
                                containerVariant="w-full py-2 sm:col-span-3 max-w-fit"
                                variant="w-full px-5"
                                type={"primary"}
                                isLoading={stateValues?.isSubmitting}
                                handleClick={() => {
                                    navigator.clipboard.writeText(stateValues?.paymentLinkUrl || "");
                                    successAlert({
                                        title: "Copied!", text: "You've copied the payment link.", icon: "",
                                    }, { data: "", errors: "", message: "", statusCode: "", status: "" })
                                }}
                                isDisabled={stateValues?.isDisabled}
                            />
                        </div>
                    </div>
                </div> :
                <form className="flex flex-wrap gap-3 w-full xl:px-14">
                    <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""} containerVariant={!stateValues?.submittingError ? "hidden" : "mx-14"} />
                    <div className="flex flex-wrap gap-10 w-full xl:px-14">
                        <label className="relative w-full flex flex-col">
                            <span className="text-gray-400 text-sm font-bold font-['Roboto'] uppercase leading-3 mb-3">Name</span>
                            <input
                                className="rounded-none peer pl-12 pr-2 py-2.5 border-t-0 border-l-0 border-r-0 border-b border-slate-300 placeholder-gray-300"
                                type="tel"
                                name="payCustomerName"
                                placeholder="Enter name"

                                onChange={handleChange}
                                value={stateValues?.payCustomerName}
                                required
                            />

                            <svg width="23" height="16" viewBox="0 0 23 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-1 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6">
                                <g clip-path="url(#clip0_1_1476)">
                                    <path d="M13.1483 0.634638V3.88051C13.1348 4.24868 12.9774 4.59684 12.7098 4.85008C12.4422 5.10333 12.0859 5.24142 11.7175 5.23464H0V2.16797C0.0167264 1.74657 0.199405 1.34888 0.508193 1.06163C0.81698 0.774388 1.22682 0.620898 1.64833 0.634638H13.1483Z" fill="#FFBB54" fill-opacity="0.933333" />
                                    <path d="M23 2.16751V14.4217C22.9951 14.6309 22.9487 14.8371 22.8636 15.0283C22.7785 15.2195 22.6564 15.3919 22.5043 15.5356C22.3522 15.6794 22.1731 15.7915 21.9774 15.8657C21.7817 15.9398 21.5733 15.9744 21.3641 15.9675H1.64833C1.22481 15.9809 0.813283 15.8257 0.504197 15.5358C0.195111 15.2459 0.0137591 14.8452 0 14.4217L0 5.23417H11.7175C12.0859 5.24095 12.4422 5.10286 12.7098 4.84962C12.9774 4.59638 13.1348 4.24822 13.1483 3.88005V0.634172H21.3641C21.5723 0.627266 21.7797 0.661466 21.9746 0.734816C22.1695 0.808166 22.3481 0.919226 22.5 1.06164C22.6519 1.20406 22.7743 1.37504 22.8601 1.56479C22.9459 1.75455 22.9934 1.95936 23 2.16751Z" fill="#465693" />
                                    <path d="M19.4733 9.18286H3.98663C3.8002 9.18286 3.6214 9.25692 3.48958 9.38875C3.35775 9.52057 3.28369 9.69937 3.28369 9.8858C3.28369 10.0722 3.35775 10.251 3.48958 10.3829C3.6214 10.5147 3.8002 10.5887 3.98663 10.5887H19.4733C19.6597 10.5887 19.8385 10.5147 19.9703 10.3829C20.1022 10.251 20.1762 10.0722 20.1762 9.8858C20.1762 9.69937 20.1022 9.52057 19.9703 9.38875C19.8385 9.25692 19.6597 9.18286 19.4733 9.18286Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1_1476">
                                        <rect width="23" height="15.3333" fill="white" transform="translate(0 0.634521)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg> */}
                        </label>

                        <label className="relative flex-1 flex flex-col">
                            <span className="text-gray-400 text-sm font-bold font-['Roboto'] uppercase leading-3 mb-3">Email Address</span>
                            <input
                                className="rounded-none peer pl-12 pr-2 py-2.5 border-t-0 border-l-0 border-r-0 border-b border-slate-300 placeholder-gray-300"
                                type="email"
                                name="payCustomerEmail"
                                placeholder="Enter email address"
                                onChange={handleChange}
                                value={stateValues?.payCustomerEmail}
                                required
                            />

                            <svg width="23" height="16" viewBox="0 0 23 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-1 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6">
                                <g clip-path="url(#clip0_1_1476)">
                                    <path d="M13.1483 0.634638V3.88051C13.1348 4.24868 12.9774 4.59684 12.7098 4.85008C12.4422 5.10333 12.0859 5.24142 11.7175 5.23464H0V2.16797C0.0167264 1.74657 0.199405 1.34888 0.508193 1.06163C0.81698 0.774388 1.22682 0.620898 1.64833 0.634638H13.1483Z" fill="#FFBB54" fill-opacity="0.933333" />
                                    <path d="M23 2.16751V14.4217C22.9951 14.6309 22.9487 14.8371 22.8636 15.0283C22.7785 15.2195 22.6564 15.3919 22.5043 15.5356C22.3522 15.6794 22.1731 15.7915 21.9774 15.8657C21.7817 15.9398 21.5733 15.9744 21.3641 15.9675H1.64833C1.22481 15.9809 0.813283 15.8257 0.504197 15.5358C0.195111 15.2459 0.0137591 14.8452 0 14.4217L0 5.23417H11.7175C12.0859 5.24095 12.4422 5.10286 12.7098 4.84962C12.9774 4.59638 13.1348 4.24822 13.1483 3.88005V0.634172H21.3641C21.5723 0.627266 21.7797 0.661466 21.9746 0.734816C22.1695 0.808166 22.3481 0.919226 22.5 1.06164C22.6519 1.20406 22.7743 1.37504 22.8601 1.56479C22.9459 1.75455 22.9934 1.95936 23 2.16751Z" fill="#465693" />
                                    <path d="M19.4733 9.18286H3.98663C3.8002 9.18286 3.6214 9.25692 3.48958 9.38875C3.35775 9.52057 3.28369 9.69937 3.28369 9.8858C3.28369 10.0722 3.35775 10.251 3.48958 10.3829C3.6214 10.5147 3.8002 10.5887 3.98663 10.5887H19.4733C19.6597 10.5887 19.8385 10.5147 19.9703 10.3829C20.1022 10.251 20.1762 10.0722 20.1762 9.8858C20.1762 9.69937 20.1022 9.52057 19.9703 9.38875C19.8385 9.25692 19.6597 9.18286 19.4733 9.18286Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1_1476">
                                        <rect width="23" height="15.3333" fill="white" transform="translate(0 0.634521)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg> */}
                        </label>

                        <label className="relative flex-1 flex flex-col">

                            <span className="text-gray-400 text-sm font-bold font-['Roboto'] uppercase leading-3 mb-3">Customized Link</span>
                            <input
                                className="rounded-none peer pl-12 pr-2 py-2.5 border-t-0 border-l-0 border-r-0 border-b border-slate-300 placeholder-gray-300"
                                type="email"
                                name="payCustomizedLink"
                                placeholder="Enter value to customise your link"

                                onChange={handleChange}
                                value={stateValues?.payCustomizedLink}
                            />

                            <svg width="23" height="16" viewBox="0 0 23 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-1 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6">
                                <g clip-path="url(#clip0_1_1476)">
                                    <path d="M13.1483 0.634638V3.88051C13.1348 4.24868 12.9774 4.59684 12.7098 4.85008C12.4422 5.10333 12.0859 5.24142 11.7175 5.23464H0V2.16797C0.0167264 1.74657 0.199405 1.34888 0.508193 1.06163C0.81698 0.774388 1.22682 0.620898 1.64833 0.634638H13.1483Z" fill="#FFBB54" fill-opacity="0.933333" />
                                    <path d="M23 2.16751V14.4217C22.9951 14.6309 22.9487 14.8371 22.8636 15.0283C22.7785 15.2195 22.6564 15.3919 22.5043 15.5356C22.3522 15.6794 22.1731 15.7915 21.9774 15.8657C21.7817 15.9398 21.5733 15.9744 21.3641 15.9675H1.64833C1.22481 15.9809 0.813283 15.8257 0.504197 15.5358C0.195111 15.2459 0.0137591 14.8452 0 14.4217L0 5.23417H11.7175C12.0859 5.24095 12.4422 5.10286 12.7098 4.84962C12.9774 4.59638 13.1348 4.24822 13.1483 3.88005V0.634172H21.3641C21.5723 0.627266 21.7797 0.661466 21.9746 0.734816C22.1695 0.808166 22.3481 0.919226 22.5 1.06164C22.6519 1.20406 22.7743 1.37504 22.8601 1.56479C22.9459 1.75455 22.9934 1.95936 23 2.16751Z" fill="#465693" />
                                    <path d="M19.4733 9.18286H3.98663C3.8002 9.18286 3.6214 9.25692 3.48958 9.38875C3.35775 9.52057 3.28369 9.69937 3.28369 9.8858C3.28369 10.0722 3.35775 10.251 3.48958 10.3829C3.6214 10.5147 3.8002 10.5887 3.98663 10.5887H19.4733C19.6597 10.5887 19.8385 10.5147 19.9703 10.3829C20.1022 10.251 20.1762 10.0722 20.1762 9.8858C20.1762 9.69937 20.1022 9.52057 19.9703 9.38875C19.8385 9.25692 19.6597 9.18286 19.4733 9.18286Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1_1476">
                                        <rect width="23" height="15.3333" fill="white" transform="translate(0 0.634521)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg> */}
                        </label>
                        <label className="relative w-full flex flex-col">
                            <span className="text-gray-400 text-sm font-bold font-['Roboto'] uppercase leading-3 mb-3">Description</span>
                            <input
                                className="rounded-none peer pl-12 pr-2 py-2.5 border-t-0 border-l-0 border-r-0 border-b border-slate-300 placeholder-gray-300"
                                type="email"
                                name="payDescription"
                                placeholder="Enter Description"

                                onChange={handleChange}
                                value={stateValues?.payDescription}
                                required
                            />

                            <svg width="23" height="16" viewBox="0 0 23 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-1 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6">
                                <g clip-path="url(#clip0_1_1476)">
                                    <path d="M13.1483 0.634638V3.88051C13.1348 4.24868 12.9774 4.59684 12.7098 4.85008C12.4422 5.10333 12.0859 5.24142 11.7175 5.23464H0V2.16797C0.0167264 1.74657 0.199405 1.34888 0.508193 1.06163C0.81698 0.774388 1.22682 0.620898 1.64833 0.634638H13.1483Z" fill="#FFBB54" fill-opacity="0.933333" />
                                    <path d="M23 2.16751V14.4217C22.9951 14.6309 22.9487 14.8371 22.8636 15.0283C22.7785 15.2195 22.6564 15.3919 22.5043 15.5356C22.3522 15.6794 22.1731 15.7915 21.9774 15.8657C21.7817 15.9398 21.5733 15.9744 21.3641 15.9675H1.64833C1.22481 15.9809 0.813283 15.8257 0.504197 15.5358C0.195111 15.2459 0.0137591 14.8452 0 14.4217L0 5.23417H11.7175C12.0859 5.24095 12.4422 5.10286 12.7098 4.84962C12.9774 4.59638 13.1348 4.24822 13.1483 3.88005V0.634172H21.3641C21.5723 0.627266 21.7797 0.661466 21.9746 0.734816C22.1695 0.808166 22.3481 0.919226 22.5 1.06164C22.6519 1.20406 22.7743 1.37504 22.8601 1.56479C22.9459 1.75455 22.9934 1.95936 23 2.16751Z" fill="#465693" />
                                    <path d="M19.4733 9.18286H3.98663C3.8002 9.18286 3.6214 9.25692 3.48958 9.38875C3.35775 9.52057 3.28369 9.69937 3.28369 9.8858C3.28369 10.0722 3.35775 10.251 3.48958 10.3829C3.6214 10.5147 3.8002 10.5887 3.98663 10.5887H19.4733C19.6597 10.5887 19.8385 10.5147 19.9703 10.3829C20.1022 10.251 20.1762 10.0722 20.1762 9.8858C20.1762 9.69937 20.1022 9.52057 19.9703 9.38875C19.8385 9.25692 19.6597 9.18286 19.4733 9.18286Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1_1476">
                                        <rect width="23" height="15.3333" fill="white" transform="translate(0 0.634521)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg> */}
                        </label>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center">
                        <DefaultButton
                            labelText={
                                <CurrencyFormat value={stateValues?.amount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"Generate Link For NGN "} />
                            }
                            containerVariant="w-max p-3 my-5 text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                            variant="w-full p-3 text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                            isLoading={stateValues?.isSubmitting}
                            handleClick={handleSubmitLink}
                            isDisabled={stateValues?.isDisabled}
                        /></div>

                </form>
            }
        </PaymentGatewayLayout>
    );
};

export default CardPaymentGateway;