import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { BsArrowRight } from 'react-icons/bs'
import { dashReceiptTableHeader } from 'Utils/mocks'
import { DefaultTable } from '../reusables'
import dayjs from 'dayjs'
import ResponseStatus from '../reusables/statuses/ResponseStatus'


function DashTrans({ data }: any) {

    const { recentTransactions } = data || {}

    return (
        <div className='w-full'>
            <div className='py-7 bg-blue-dark rounded-lg min-h-fit 
            overflow-x-scroll scrollbar-hide'>
                <div className='px-10 bg-blue-dark mb-10 flex flex-col sm:flex-row justify-between gap-y-5'>
                    <div className='m-0'>
                        <p className='text-base font-600 text-primary-white'>Recent Transactions</p>
                    </div>
                </div>
                <DefaultTable
                    header={dashReceiptTableHeader}
                    tableBody={recentTransactions?.filter((one: any, i: any) => i < 15)?.map((item: any, index: any) => (
                        <tr key={`row-${index}`} className=" border-b border-blue-darkish text-gray-200">
                            <td className={`text-center ${item?.transaction_type !== "DISBURSEMENT" ? "text-green-500" : "text-red-500"} text-base font-500 py-5 px-6`}>
                                {!item?.amount ? 0 : <CurrencyFormat value={item?.amount || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />}
                            </td>
                            <td className={`text-center ${item?.transaction_type !== "DISBURSEMENT" ? "text-green-500" : "text-red-500"} text-base font-500 py-5 px-6`}>
                                {!item?.amount_impact ? 0 : <CurrencyFormat value={item?.amount_impact || ""} displayType={'text'} thousandSeparator={true} fixedDecimalScale={true} decimalScale={2} prefix={"₦"} />}
                            </td>
                            <td className='text-center text-base font-500 py-5 px-6'>{item?.transaction_type || ""}</td>
                            <td className='text-center text-base font-500 py-5 px-6'>{item?.name || ""}</td>
                            <td className='text-center text-base font-500 py-5 px-6'>{dayjs(item?.tranDate || new Date()).format('MMM DD, YYYY')}</td>
                            <td className='text-center text-base font-500 py-5 px-6'>
                                <ResponseStatus status={item?.responseCode || ""} statusText={item?.responseCode} />
                            </td>

                        </tr>
                    ))}
                    noData={!recentTransactions || recentTransactions?.length < 1 ? true : false}
                    hasPagination={false}
                />
            </div>
        </div>
    )
}

export default DashTrans;