import React, {useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {DataGrid, GridColDef, GridRowsProp, GridApi, GridRowId} from "@mui/x-data-grid";
import {BsThreeDots} from "react-icons/bs";
import Image from "next/image";
import {PenIcon} from "@public/assets";
import {Trash} from "react-huge-icons/bulk";

const Users = () => {

    const [isDropDownActive, setIsDropDownActive] = useState(false)

    const [selected, setSelected] = useState<number>();

    const usersListData: GridRowsProp = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            portrait: "../public/assets/utils/cloud.png",
            email: "omonigho.efeoghene@outlook.com",
            phone: "08123456789",
            gender: "male",
            action: "edit"
        },
        {
            id: 2,
            firstName: "John",
            lastName: "Doe",
            portrait: "../public/assets/utils/cloud.png",
            email: "omonigho.efeoghene@outlook.com",
            phone: "08123456789",
            gender: "male",
            action: "edit"
        }
    ]

    const usersListFields: GridColDef[] = [
        {
            field: "id",
            headerName: "#",
            align: "center",
            headerAlign: "center",
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            headerAlign: "left",
            align: "left",
            renderCell: ({row: {firstName, lastName}}: { row: { firstName: string, lastName: string } }) => {
                return (
                    <div className={`rounded w-full flex justify-start items-center`}>
                        <div className="ml-3">
                            <p className="text-sm font-bold">{firstName} {lastName}</p>
                        </div>
                    </div>
                )
            },
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phone",
            headerName: "Phone Number",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "gender",
            headerName: "Gender",
            flex: 0.5,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "action",
            headerName: "",
            flex: 0.5,
            headerAlign: "center",
            align: "center",
            cellClassName: "action",
            renderCell: ({row: {id}}: { row: { id: number } }) => {

                return (
                    <div className={`rounded w-full flex justify-center items-center relative`}>
                        <BsThreeDots
                            onClick={() => setIsDropDownActive(!isDropDownActive)}
                            className="text-2xl cursor-pointer"
                        />
                        <div
                            className={`absolute p-0 m-0 top-10 rounded-md bg-white backdrop-blur-sm z-50 inset-x-0 w-full shadow-xl`}>
                            <ul className={`list-none px-2 text-xs font-nunito text-white flex-col gap-1 ${isDropDownActive ? "flex justify-center items-center" : "hidden"}`}>
                                {/*TODO: Fetch this from an API or from an array*/}
                                <li
                                    onClick={() => {
                                        // Enable edit mode for the row

                                        setIsDropDownActive(false)
                                    }}
                                    className="w-full p-1 flex justify-start items-center rounded-md cursor-pointer text-blue-600 bg-sky-400"
                                >
                                    <Image src={PenIcon} alt={"pen"} width={16} height={16}/>
                                    <p className="ml-3 font-semibold">Edit</p>
                                </li>
                                <li
                                    onClick={() => {
                                        console.log(id) //TODO: Delete the user with this id
                                        setIsDropDownActive(false)
                                    }}
                                    className="w-full p-1 flex justify-start items-center text-red rounded-md cursor-pointer z-50"
                                >
                                    <Trash className="w-4 h-4"/>
                                    <p className="ml-3 font-semibold">Delete</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            },
            sortable: false,
            hideSortIcons: true,
        }
    ]

    return (
        <DashboardLayout>
            <main className="px-10 pb-4 h-screen">
                Users
                <DataGrid
                    columns={usersListFields}
                    rows={usersListData}
                    // checkboxSelection={true}
                    // disableRowSelectionOnClick={true}
                    sx={{
                        "& .MuiDataGrid-main": {
                            fontFamily: "Nunito",
                            color: "#030229",
                            border: "none",
                            backgroundColor: "transparent",
                        },
                        "& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell": {
                            overflow: "visible",
                        },
                        "& .MuiDataGrid-root": {
                            border: "none",
                            borderStyle: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            border: "none",
                            // backgroundColor: "#b3b",
                        },
                        "& .MuiDataGrid-withBorderColor .MuiDataGrid-cell": {
                            border: "none",
                        },
                        // "& .MuiDataGrid-scrollArea": {
                        //     border: "none",
                        //     margin: "2px 0 2px 0",
                        //     borderRadius: "5px",
                        //     backgroundColor: "#fff",
                        // },
                        "& .MuiDataGrid-cellContent": {
                            border: "none",
                        },
                        "& .MuiDataGrid-columnsContainer": {
                            backgroundColor: "#F5F5F5",
                            border: "none",
                            margin: "2px 0"
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            border: "none",
                        },
                        ".css-12o3vl3-MuiDataGrid-root": {
                            borderStyle: "none",
                        },
                    }}
                />
            </main>
        </DashboardLayout>
    );
};

export default Users;