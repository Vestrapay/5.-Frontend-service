import React, { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import DashPieChart from '@/components/charts/DashPieChart'
import DashTotalCollection from '@/components/charts/DashTotalCollection'
import DashTransReport from '@/components/charts/DashTransReport'
import CurrencyFormat from 'react-currency-format';

function DashCharts({ data }: any) {

    //initialize data values
    const { thisWeekGraphData, lastWeekGraphData, currentWeekCardGraphData, totalCollectionAmount, currentWeekTransferGraphData, currentWeekCollectionsGraphData, currentWeekCashGraphData, totalTransactionAmount, walletBalance } = data || {}

    //state values
    const [trans, setTrans] = useState(false)
    const [wallets, setWallets] = useState(false)
    const [cardType, setCardType] = useState(false)
    const [transferType, setTransferType] = useState(false)
    const [cashType, setCashType] = useState(false)
    const [typeChecker, setTypeChecker] = useState(false)
    const [displayAmount, setDisplayAmount] = useState(0)

    React.useEffect(() => {
        if (cardType || transferType || cashType) {
            setTypeChecker(false)
        } else {
            setTypeChecker(true)
        }
    }, [cardType, transferType, cashType])

    React.useEffect(() => {
        setDisplayAmount(!trans ? totalCollectionAmount : walletBalance || 0)
    }, [wallets, trans, walletBalance, totalTransactionAmount])
    console.log(displayAmount);

    return (
        <div className='w-full lg:w-4/6 rounded-lg bg-blue-dark min-w-max max-h-fit'>
            <div className="p-5 flex sm:flex-row flex-col-reverse lg:flex-col-reverse xl:flex-row justify-between items-start xl:items-center gap-y-5 p-4 rounded-lg ">
            <p className='word-break w-full pl-2 text-white'>Transaction Trend</p>
            </div>
            <p className='px-5 text-gray-600'>
                Wallet Balance:
            </p>
            <div className='px-5 pb-2'>
                <div className='flex justify-between md:flex-row flex-col items-start md:items-center gap-1 pb-4'>
                    <div>
                        <CurrencyFormat
                            value={0}
                            displayType={'text'}
                            thousandSeparator={true}
                            // prefix={currCheck ? currency : ""}
                            renderText={(value: any) =>
                                <p>
                                    <span className='text-primary-white w-fit text-lg text-start inline-block align-top pt-2 m-0 font-100'>₦</span>
                                    <span className='text-primary-white w-fit text-[40px] m-0 font-500'>{value || 0}</span>
                                    <span className='text-primary-white w-fit text-lg text-start inline-block align-top pt-2 m-0 font-100'>.{Number(((0 || 0) % 1).toFixed(2).split('.')[1])}</span>
                                </p>
                            } />
                    </div>
                    <div>
                        {!trans ?
                            <>
                                {typeChecker ?
                                    <div className='flex items-center gap-x-2'>
                                        <div className='w-3 h-3 rounded-full bg-primary-blue'></div>
                                        <p className='font-400 text-base text-gray-200'>Total Collections</p>
                                    </div>
                                    :
                                    <div className='flex items-center gap-x-3'>
                                        {!cardType ? null : <div className='flex items-center gap-x-2'>
                                            <div className='w-3 h-3 rounded-full bg-[#007AF4]'></div>
                                            <p className='font-400 text-base text-blue-midnight'>Card</p>
                                        </div>}
                                        {!transferType ? null : <div className='flex items-center gap-x-2'>
                                            <div className='w-3 h-3 rounded-full bg-[#284DE3]'></div>
                                            <p className='font-400 text-base text-blue-midnight'>Transfer</p>
                                        </div>}
                                        {!cashType ? null : <div className='flex items-center gap-x-2'>
                                            <div className='w-3 h-3 rounded-full bg-[#FECA03]'></div>
                                            <p className='font-400 text-base text-blue-midnight'>Cash</p>
                                        </div>}
                                    </div>
                                }
                            </> :
                            <div className='flex jusstify-around gap-3'>
                                <div className='flex items-center gap-2'>
                                    <div className='w-3 h-3 rounded-full bg-yellow-400'></div>
                                    <p className='font-400 text-base text-gray-200'>Previous</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='w-3 h-3 rounded-full bg-primary-blue'></div>
                                    <p className='font-400 text-base text-gray-200'>Next</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className=' overflow-x-auto relative h-[50vw] w-[70vw] xs:h-full xs:w-full ' >
                    {!trans ?
                        <DashTotalCollection
                            data={{ currentWeekCollectionsGraphData: currentWeekCollectionsGraphData, currentWeekCardGraphData: currentWeekCardGraphData, currentWeekTransferGraphData: currentWeekTransferGraphData, currentWeekCashGraphData: currentWeekCashGraphData }}
                            typeChecker={typeChecker}
                            displayChecker={{ cardType, transferType, cashType }} /> :
                        <DashTransReport data={{ thisWeekGraphData: thisWeekGraphData, lastWeekGraphData: lastWeekGraphData }} />
                    }
                </div>
            </div>
        </div>
    )
}

export default DashCharts;