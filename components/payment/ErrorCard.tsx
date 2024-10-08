import { BsFillExclamationTriangleFill } from "react-icons/bs"
import { DefaultButton } from "../reusables";

const ErrorCard = ({ handleSubmit, loader }: any) => {

    return (
        <>
            <div className="w-full h-max bg-neutral-100 rounded-md border border-stone-500 border-opacity-20 flex-col justify-center items-center flex  pt-11 pb-11">
                <div className="h-max p-10 pt-5 flex-col justify-center items-center gap-2 flex">
                    <div>
                        <BsFillExclamationTriangleFill size={75} />
                    </div>
                    <div className="h-max pt-2 flex-col  justify-center items-center gap-1 flex">
                        <div className="text-neutral-600 text-2xl font-normal font-['Roboto'] leading-tight tracking-wide  text-center ">Unsuccessful Initiation</div>
                        <div className="w-full pt-1 justify-center items-center inline-flex">
                            <div className=" justify-center items-center flex">
                                <div className=" font-base font-['Roboto'] leading-loose text-zinc-500 text-base text-center max-w-[450px]">
                                    We couldn't initiate your transaction right now, please try again.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DefaultButton
                labelText={"Re Initiate"}
                containerVariant="w-max p-3 my-5 text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                variant="w-full p-3 text-center text-neutral-50 text-lg font-extrabold font-['Roboto'] leading-tight"
                isLoading={loader}
                handleClick={() => handleSubmit(null)}
            // isDisabled={stateValues?.isDisabled}
            />
        </>
        )
}

export default ErrorCard;