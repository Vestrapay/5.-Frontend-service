import React from 'react'
import DashPieChart from '../charts/DashPieChart'
import Image from 'next/image'
import { BlocksIcon } from '../reusables/icons'
import CurrencyFormat from 'react-currency-format'

function DashInfo({ data }: any) {

  //data values
  const { totalActiveMerchantsCount, totalInactiveMerchantsCount, totalMerchants } = data?.merchantStats || {}
  const { activeTerminalsCount, totalTerminals, inactiveTerminalsCount } = data?.terminalStats || {}

  const { transactionVolumeTransfer, totalTransactionsToday, transactionVolumeCard, transactionVolumeCash } = data?.transactionVolume || {}

  return (
    <div className='flex gap-4 w-full flex-col md:flex-row justify-between'>
      
      <div className='rounded-lg bg-blue-dark w-full md:w-2/6 max-h-fit'>
        <div className='p-5 flex flex-row md:flex-col gap-x-5'>
          <BlocksIcon />
          <div>
            <p className='text-gray-500 w-fit text-sm font-300 my-3'>
              Transaction Value
            </p>
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
          </div>
        </div>
      </div>

      <div className='rounded-lg bg-blue-dark w-full md:w-2/6 max-h-fit'>
        <div className='p-5 flex flex-row md:flex-col gap-x-5'>
          <BlocksIcon />
          <div>
            <p className='text-gray-500 w-fit text-sm font-300 my-3'>
              {`Transaction Volume (Today)`}
            </p>
            <p className='text-primary-white w-fit text-[30px] font-600 mt-5'>
              {totalTransactionsToday || 0}
            </p>
          </div>
        </div>
      </div>

      <div className='rounded-lg bg-blue-dark w-full md:w-2/6 max-h-fit'>
        <div className='p-5 flex flex-row md:flex-col gap-x-5'>
          <BlocksIcon />
          <div>
            <p className='text-gray-500 w-fit text-sm font-300 my-3'>
              Total Accounts Created
            </p>
            <p className='text-primary-white w-fit text-[30px] font-600 mt-5'>
              {0}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashInfo;