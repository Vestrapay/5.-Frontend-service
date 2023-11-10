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


const CardPaymentGateway: NextPage = () => {

    const { handleSubmitLink, handleClearError, handleChange, handleExtraChange, stateValues } = paymentGatewayController()


    return (
        <PaymentGatewayLayout>

            <form className="flex flex-wrap gap-3 w-full px-14">
                <LoginErrorCard handleClear={handleClearError} error={stateValues?.errorMssg || ""} containerVariant={!stateValues?.submittingError ? "hidden" : "mx-14"} />
                <div className="flex flex-wrap gap-10 w-full px-14">
                    <label className="relative w-full flex flex-col">
                        <span className="text-gray-400 text-sm font-bold font-['Roboto'] uppercase leading-3 mb-3">CARD NUMBER</span>
                        <input
                            className="rounded-none peer pl-12 pr-2 py-2.5 border-t-0 border-l-0 border-r-0 border-b border-slate-300 placeholder-gray-300"
                            type="tel"
                            name="number"
                            placeholder="0000 0000 0000"
                            maxLength={19}
                            onChange={handleChange}
                            value={stateValues?.number}
                            required
                        />


                        <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="absolute bottom-0 right-2.5 mb-2 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-3 w-3">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.16995 4.36283H7.61895V3.51888C7.61895 1.84469 6.18037 0.483398 4.4451 0.483398C2.70983 0.483398 1.27125 1.84469 1.27125 3.51888V4.36283H0.763878C0.480899 4.36283 0.283936 4.70315 0.283936 4.97491V10.1072C0.283936 10.3789 0.480899 10.4886 0.763878 10.4886H8.18366C8.46539 10.4886 8.61997 10.3789 8.61997 10.1072V4.97491C8.6075 4.70315 8.43797 4.36283 8.16995 4.36283ZM3.76944 8.71846L3.99383 7.46562C3.89543 7.40253 3.81427 7.31593 3.75769 7.21365C3.70111 7.11136 3.67087 6.9966 3.66971 6.87972C3.66971 6.45837 4.0225 6.11929 4.46006 6.11929C4.89637 6.11929 5.24916 6.45837 5.24916 6.87972C5.24916 7.13901 5.12325 7.31603 4.92504 7.45316L5.15067 8.71846H3.76944ZM2.11644 3.51888V4.36283H6.7725V3.51888C6.7725 2.27975 5.71289 1.28746 4.44385 1.28746C3.17481 1.28746 2.11644 2.29347 2.11644 3.51888Z" fill="#4F4F4F" />
                        </svg>
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
                        <span className="text-gray-400 text-sm font-bold font-['Roboto'] uppercase leading-3 mb-4">Expire date</span>
                        {/* <DateField className="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" /> */}
                        <input className="rounded-none peer pl-12 pr-2 py-2.5 border-t-0 border-l-0 border-r-0 border-b border-slate-300 placeholder-gray-300"
                            type="tel"
                            name="date"
                            placeholder="MM/YYYY"
                            maxLength={7}
                            onChange={handleChange}
                            value={stateValues?.date}
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
                    </label>

                    <label className="relative flex-1 flex flex-col">
                        <span className="text-gray-400 text-sm font-bold font-['Roboto'] leading-3 mb-3 flex items-center">
                            <span className="uppercase pr-2">CVC/CVV</span>
                            <span className="relative group">
                                <span className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-[250px] top-1/2 bg-black leading-5 text-white">
                                    {`Your CVV is the 3 or 4-digit number on the back of your card (the side without the chip).`}
                                </span>
                                {/* <span>Help ?</span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 -mb-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                        </span>
                        <input className="rounded-none peer pl-12 pr-2 py-2.5 border-t-0 border-l-0 border-r-0 border-b border-slate-300 placeholder-gray-300"
                            type="tel"
                            name="cvv"
                            placeholder="&bull;&bull;&bull;"
                            maxLength={4}
                            onChange={handleChange}
                            value={stateValues?.cvv}
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
                    </label>

                    <label className="relative flex-1 w-full flex flex-col">
                        <span className="text-gray-400 text-sm font-bold font-['Roboto'] uppercase leading-3 mb-3">Name on CARD</span>
                        <input className="rounded-none peer pl-12 pr-2 py-2.5 border-t-0 uppercase border-l-0 border-r-0 border-b border-slate-300 placeholder-gray-300"
                            type="tel"
                            onChange={handleChange}
                            value={stateValues?.name}
                            required
                            name="name"
                            placeholder="John Doe Smith" />


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
                    </label>

                    <label className="relative flex-1 flex flex-col">
                        <span className="text-gray-400 text-sm font-bold font-['Roboto'] leading-3 mb-3 flex items-center">
                            <span className="uppercase pr-2">Pin</span>
                            <span className="relative group">
                                <span className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-[250px] top-1/2 bg-black leading-5 text-white">
                                    {`Input your card pin necessary to perform trasanctions.`}
                                </span>
                                {/* <span>Help ?</span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 -mb-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                        </span>
                        <input className="rounded-none peer pl-12 pr-2 py-2.5 border-t-0 border-l-0 border-r-0 border-b border-slate-300 placeholder-gray-300"
                            type="password"
                            name="pin"
                            placeholder="&bull;&bull;&bull;&bull;"
                            maxLength={6}
                            onChange={handleChange}
                            value={stateValues?.pin}
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
                    </label>
                </div>
                <div className="w-full flex flex-row justify-center items-center">
                    <DefaultButton
                        labelText={
                            <CurrencyFormat value={stateValues?.amount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"Pay NGN "} />
                        }
                        containerVariant="w-max p-3 my-5 text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                        variant="w-full p-3 text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                        isLoading={stateValues?.isSubmitting}
                        handleClick={handleSubmitLink}
                        isDisabled={stateValues?.isDisabled}
                    /></div>

            </form>

        </PaymentGatewayLayout>
    );
};

export default CardPaymentGateway;