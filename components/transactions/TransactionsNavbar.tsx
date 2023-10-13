"use client"
import React, {useState} from 'react';
import {FaFileDownload} from "react-icons/fa";
import {GridApiCommunity} from "@mui/x-data-grid/internals";
import {GridValidRowModel} from "@mui/x-data-grid";
import XLSX from "sheetjs-style";
import FileSaver from "file-saver";
import {RiFileExcel2Fill} from "react-icons/ri"
import {FaFileCsv} from "react-icons/fa"

const TransactionsNavbar = ({apiRef, data}:{apiRef: React.MutableRefObject<GridApiCommunity>, data:any | GridValidRowModel[]}) => {

    const [isHovered, setIsHovered] = useState(false);

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blobData = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(blobData, "vestrapay transactions" + fileExtension);
    }

    return (
        <div className="flex justify-between">
            <p className="text-ultraMarine text-2xl flex justify-start">
                Transactions - Txn.
            </p>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative flex justify-end items-center text-card"
            >
                <p
                    className="text-sm w-[130px] h-[40px] flex justify-center items-center bg-selected p-4 rounded-md text-white gap-3 cursor-pointer hover:bg-opacity-95 active:bg-opacity-80">
                    <FaFileDownload className="text-sm"/>
                    Export
                </p>
                {
                    isHovered && (
                        <div
                            className="bg-black/60 text-white absolute top-16 w-full z-50 cursor-pointer flex flex-col items-center rounded-md text-sm backdrop-blur-sm">
                            <p
                                onClick={() => {
                                    apiRef?.current.exportDataAsCsv()
                                }}
                                className="hover:bg-black/70 gap-2 m-0 p-2 text-xs w-full rounded-t-md flex items-center"
                            >
                                <FaFileCsv className="text-xs"/>
                                Export as CSV
                            </p>
                            <p
                                onClick={() => {
                                    exportToExcel()
                                }}
                                className="hover:bg-black/70 text-xs gap-2 m-0 p-2 w-full rounded-b-md flex items-center"
                            >
                                <RiFileExcel2Fill className="text-xs"/>
                                Export as Excel
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default TransactionsNavbar;