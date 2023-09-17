
import React, { ReactNode } from "react";
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style'
import { exportData } from "containers/exportApi";


export interface ExportProps {
    excelData: any | string;
    fileName: string;
    children: ReactNode;
    url?: string;
    params?: any;
}


const ExportExcel = ({ excelData, fileName, url = "", params, children }: ExportProps) => {
    const formatedData = excelData?.map((e: any) => JSON.stringify(e));
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const fileExtension = '.xlsx';
    // console.log(formatedData)
    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);

        exportData(url, params);
    }

    return (
        <button onClick={(e) => exportToExcel()} className="border-none bg-[#fff]">
            {children}
        </button>
    )
}

export default ExportExcel;