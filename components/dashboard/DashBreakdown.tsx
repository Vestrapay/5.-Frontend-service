import React from 'react'
import Image from 'next/image'
import { EmptyPerformanceIcon } from '../reusables/icons'
import CurrencyFormat from 'react-currency-format'
import { dashBranchTableHeader } from 'Utils/mocks'
import { DefaultTable } from '../reusables'
import DashPieChart from '../charts/DashPieChart'

function DashBreakdown({ data }: any) {

  return (
    <div className='w-full lg:w-2/6 max-h-fit py-7 bg-blue-dark rounded-lg p-5 bg-blue-dark flex flex-col gap-5'>
      <div className='flex justify-between items-center flex-col lg:flex-row'>
        <p className='text-base font-600 text-primary-white'>Transaction Volume</p>
        <div className='flex items-center gap-1'>
          <span className='px-1 rounded-md bg-whites-ghost text-green-500 font-600'>
            {`+${0}`}
          </span>
          <p className='text-primary-white w-fit text-sm font-500'>
            since Today
          </p>
        </div>
      </div>
      <div className='flex justify-around items-center gap-3 flex-col'>
        <div className='w-fit py-5'>
          <DashPieChart data={data?.transactionVolume} />
        </div>
        <div className='w-full flex flex-col gap-5 p-5'>
          <p className='font-100 text-sm text-gray-300'>Banks:</p>
          <div className='flex justify-between gap-2'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-primary-blue'></div>
              <p className='font-100 text-sm text-gray-300'>Build</p>
            </div>
            <p className='font-300 text-sm text-gray-300'>{`${0 || 0}`}</p>
          </div>
          <div className='flex justify-between gap-2'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-blue-aqua'></div>
              <p className='font-300 text-sm text-gray-300'>Build</p>
            </div>
            <p className='font-300 text-sm text-gray-300'>{`${0 || 0}`}</p>
          </div>
          <div className='flex justify-between gap-2'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-yellow-500'></div>
              <p className='font-300 text-sm text-gray-300'>Build</p>
            </div>
            <p className='font-300 text-sm text-gray-300'>{`${0 || 0}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBreakdown