
import React, { useState } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import TransactionsNavbar from "@/components/transactions/TransactionsNavbar";
import { useGridApiRef } from "@mui/x-data-grid";
import { DefaultButton } from '@/components/reusables';
import { BsPlus } from 'react-icons/bs';
import router from 'next/router';
import StartTransaction from '@/components/transactions/StartTransaction';

const Card = () => {

    const apiRef = useGridApiRef()
    const [stateData, setStateData] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    })

    const [showDelete, setShowDelete] = useState<any>(false);

    return (
        <>
            <DashboardLayout>

                <main className="relative flex flex-1 flex-col px-10 pb-4 h-screen w-full overflow-x-visible transition-all duration-300 ease-in-out px-10 sm:px-12 pb-10 h-full">
                    <nav>
                        <TransactionsNavbar apiRef={apiRef} data={[]} name="Cards" />
                    </nav>
                    <>
                        <div className="w-full lg:w-2/3 text-black text-lg sm:text-5xl font-bold font-['Nunito'] sm:p-5">
                            With your Vestrapay card, you can make payments anywhere, globally and in any currency.
                        </div>
                        <DefaultButton
                            icon={<BsPlus size={25} />}
                            labelText="Pay with card"
                            handleClick={setShowDelete}
                            variant={"bg-selected cursor-poNunito flex items-center p-0 min-w-max sm:m-5"}
                        />
                    </>
                </main>
            </DashboardLayout>

            <StartTransaction
                show={showDelete}
                setShow={setShowDelete}
                // data={selectedDetails}
            />
        </>
    );
};

export default Card;