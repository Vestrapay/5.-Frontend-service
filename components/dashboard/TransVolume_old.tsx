import React from 'react'
import DashPieChart from '../charts/DashPieChart'

function TransVolume({ data }: any) {

    //data values
    const { transactionVolumeTransfer, totalTransactionsToday, transactionVolumeCard, transactionVolumeCash } = data?.transactionVolume || {
        transactionVolumeTransfer: 0, totalTransactionsToday: 0, transactionVolumeCard: 0, transactionVolumeCash: 0
    }

    return (
        <div className='rounded-lg min-w-max p-5 bg-primary-white flex flex-col gap-5'>
            <div className='flex justify-between items-center flex-col lg:flex-row'>
                <p className='text-gray-500 w-fit text-sm font-100'>
                    Transaction Volume
                </p>
                <div className='flex items-center gap-1'>
                    <span className='px-1 rounded-md bg-white-ghost text-green-500 font-600'>
                        {`+${totalTransactionsToday || 0}`}
                    </span>
                    <p className='text-blue-midnight w-fit text-sm font-500'>
                        since Today
                    </p>
                </div>
            </div>
            <div className='flex justify-around items-center gap-3 flex-col md:flex-row'>
                <div className='lg:w-1/2'>
                    <DashPieChart data={data?.transactionVolume} />
                </div>
                <div className='lg:w-1/2 flex flex-col gap-5 p-5'>
                    <div className='flex justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 rounded-full bg-primary-blue'></div>
                            <p className='font-100 text-sm text-blue-midnight'>Card</p>
                        </div>
                        <p className='font-300 text-sm text-blue-midnight'>{`${transactionVolumeCard || 0}`}</p>
                    </div>
                    <div className='flex justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 rounded-full bg-blue-aqua'></div>
                            <p className='font-300 text-sm text-blue-midnight'>Transfer</p>
                        </div>
                        <p className='font-300 text-sm text-blue-midnight'>{`${transactionVolumeTransfer || 0}`}</p>
                    </div>
                    <div className='flex justify-between gap-2'>
                        <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 rounded-full bg-yellow-500'></div>
                            <p className='font-300 text-sm text-blue-midnight'>Cash</p>
                        </div>
                        <p className='font-300 text-sm text-blue-midnight'>{`${transactionVolumeCash || 0}`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransVolume