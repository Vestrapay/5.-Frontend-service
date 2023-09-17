import React, { useState } from 'react'
// import { CheckBox } from '../CheckBox'
// // import { Pagination } from "./Pagination";
import DefaultPagination from '../Paginations/Default'
import ExportExcel from 'Utils/helpers/exportExcel'
import { EmptyTransactionIcon } from '../icons'
import PreLoader from '../loader/PreLoader'



export interface TableProps {
    header: any
    totalPages?: number
    totalValue?: number
    currentPage?: number
    onHandleAllCheckbox?: (arg: any) => void
    onHandleDelete?: (arg: any) => void
    onHandlePrompt?: (arg: any) => void
    tableBody: any
    isLoading?: boolean,
    showPrompt?: boolean,
    showDelete?: boolean,
    showRestore?: boolean,
    onHeaderClick?: (value: any) => void
    changePage?: (num: number) => void
    hasPagination?: boolean
    showCheckBox?: boolean
    list?: any
    name?: string
    tableVariants?: string
    noData?: boolean
    onCheck?: (value: any) => void
}

const DefaultTable = ({
    header,
    tableBody,
    onHandleAllCheckbox,
    onHandleDelete,
    onHandlePrompt,
    showDelete = true,
    showRestore = false,
    showPrompt = false,
    isLoading = false,
    totalPages = 0,
    totalValue = 0,
    currentPage = 0,
    hasPagination = true,
    showCheckBox = true,
    changePage = () => null,
    list = [],
    name = '',
    tableVariants = "",
    noData = false
}: TableProps) => {


    const [temp, setTemp] = useState<any>({
        totalPages: 10,
        currentPage: 0,
    })

    const changeCurrentPage = (data: any) => {
        console.log(data)
        changePage(data.selected)
    }

    return (
        <>
            <div className={`bg-blue-dark rounded mt-5`}>
                <div className=" min-h-fit overflow-x-scroll scrollbar-hide">
                    <table className="table-auto overflow-x-scroll scrollbar-hide w-full max-w-[100vw]">
                        <thead>
                            <tr className="text-xs text-gray-200 font-300 uppercase bg-blue-darkish px-5">
                                {header?.map(
                                    (
                                        title: {
                                            variant: any
                                            innerVariant?: any
                                            headerStyle?: any
                                            name:
                                            | string
                                            | number
                                            | boolean
                                            | React.ReactElement<
                                                any,
                                                string | React.JSXElementConstructor<any>
                                            >
                                            | React.ReactFragment
                                            | React.ReactPortal
                                            | null
                                            | undefined
                                        },
                                        index: any,
                                    ) => (
                                        <th
                                            key={`header-${title}-${index}`}
                                            className={`font-600 py-5 px-6 ${title.variant} `}
                                            style={title?.headerStyle || {}}
                                        >
                                            <p className={`${title.innerVariant} `}>
                                                {title.name}
                                            </p>
                                        </th>
                                    ),
                                )}
                            </tr>
                        </thead>
                        <tbody className="px-2">
                            {/* Get the custom body component here */}
                            {tableBody}
                        </tbody>
                    </table>
                    {isLoading &&
                        <PreLoader float width="h-3" height="h-3" />
                    }
                    {noData &&
                        <div className='my-14 flex flex-col justify-center items-center'>
                            <div className='flex flex-col justify-center items-center mb-4'>
                                <EmptyTransactionIcon />
                            </div>
                        </div>
                    }
                </div>
                <div>
                    {hasPagination && (
                        <DefaultPagination
                            changePage={changeCurrentPage}
                            totalPages={totalPages || 1}
                            totalValue={totalValue || 0}
                            currentPage={currentPage || 0}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default DefaultTable
