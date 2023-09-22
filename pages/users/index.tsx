import React, {useState} from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import {BsThreeDots} from "react-icons/bs";
import Image from "next/image";
import {LineHorizontal, PenIcon, ProfileImage3} from "@public/assets";
import {Trash} from "react-huge-icons/bulk";
import UsersNavbar from "@/components/users/UsersNavbar";
import {Gender} from "@types";
import {useNewUserContext} from "../../context/newUserContext";

const Users = () => {

    const [isDropDownActive, setIsDropDownActive] = useState(false)

    const [selected, setSelected] = useState<number | null>();

    const [isEditable, setIsEditable] = useState(false);

    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    const {isCreateUser} = useNewUserContext();

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
            firstName: "Mary",
            lastName: "Ann",
            portrait: "../public/assets/utils/cloud.png",
            email: "marry.ann@outlook.com",
            phone: "08123456789",
            gender: "female",
            action: "edit"
        }
    ]

    const usersListFields: GridColDef[] = [
        {
            field: "id",
            headerName: "#",
            align: "center",
            headerAlign: "center",
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            headerAlign: "left",
            align: "left",
            valueGetter: ({row: {firstName, lastName}}: { row: { firstName: string, lastName: string } }) => `${firstName} ${lastName}`,
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
            renderCell: ({row: {gender}}: { row: { gender: Gender } }) => {
                return (
                    <div className="w-full h-full flex justify-center items-center">
                        <p className={`${gender.toLowerCase() === "male" ? "bg-sky-50 text-blue-600" : "bg-pink-50 text-pink-400"} w-[70%] h-1/2 text-center capitalize rounded-lg flex items-center justify-center`}>
                            {gender}
                        </p>
                    </div>
                )
            }
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
                            onClick={() => {
                                setIsDropDownActive(!isDropDownActive)
                                setSelected(id)
                            }}
                            className="text-2xl cursor-pointer"
                        />
                        <div
                            onMouseLeave={() => {
                                setIsDropDownActive(false)
                            }}
                            className={`absolute p-0 m-0 top-10 w-full rounded-md bg-white backdrop-blur-sm z-50 inset-x-0 shadow-xl flex flex-col`}>
                            <ul className={`list-none px-2 text-xs font-nunito text-white flex-col gap-1    ${isDropDownActive && selected == id ? "flex justify-center items-center" : "hidden"}`}>
                                {/*TODO: Fetch this from an API or from an array*/}

                                <li
                                    onClick={() => {
                                        // Enable edit mode for the row
                                        console.log("Editing user with id: ", id) //TODO: Edit the user with this id
                                        setIsDropDownActive(false)
                                        setIsEditable(true)

                                    }}
                                    className="w-full px-2 flex justify-start items-center rounded-md cursor-pointer text-blue-600 bg-sky-100 hover:bg-sky-200"
                                >
                                    <Image src={PenIcon} alt={"pen"} width={16} height={16}/>
                                    <p className="ml-3 w-full font-semibold text-left justify-start">Edit</p>
                                </li>
                                <li
                                    onClick={() => {
                                        console.log("Deleting user with id: ", id) //TODO: Delete the user with this id
                                        setIsDropDownActive(false)
                                    }}
                                    className="w-full px-2 flex justify-start items-center text-red rounded-md cursor-pointer z-50 bg-red-100 hover:bg-red-200"
                                >
                                    <Trash className="w-4 h-4"/>
                                    <p className="ml-3 font-semibold text-left justify-start">Delete</p>
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
            <main
                className="flex flex-1 flex-col px-10 pb-4 h-screen w-full overflow-x-visible transition-all duration-300 ease-in-out">
                <UsersNavbar/>
                <DataGrid
                    columns={usersListFields}
                    rows={usersListData}
                    // checkboxSelection={true}
                    disableRowSelectionOnClick={true}
                    getRowClassName={() => "users-table--row"}
                    sx={{
                        "& .users-table--row": {
                            marginBottom: "10px",
                            borderRadius: "10px",
                        },
                        '&.MuiDataGrid-root .MuiDataGrid-row': {
                            backgroundColor: '#fff',
                            overflow: 'visible',
                            outline: "none !important",
                            "&:hover": {
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                transform: "translateY(-2px)",
                                // transition: "all 0.2s ease-in-out",
                                zIndex: 100,
                            }
                        },
                        "& .MuiDataGrid-main": {
                            fontFamily: "Nunito",
                            color: "#030229",
                            border: "none",
                            backgroundColor: "transparent",
                            overflow: "visible",

                        },
                        "& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell": {
                            overflow: "visible",
                            // backgroundColor: "red",
                        },
                        "& .MuiDataGrid-root": {
                            border: "none",
                            borderStyle: "none",
                            overflow: "visible",
                            width: "100%",
                        },
                        "& .MuiDataGrid-cell": {
                            border: "none",
                            // backgroundColor: "#b3b",
                        },
                        "& .MuiDataGrid-withBorderColor .MuiDataGrid-cell": {
                            border: "none",
                            overflow: "visible",
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
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            border: "none",
                        },
                        '&, [class^=MuiDataGrid]': {
                            border: 'none',
                        },
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                            outline: "none !important",
                        },
                    }}
                />
            </main>
            <div
                className={`w-[302px] ${isEditable && selected ? "flex flex-col flex-nowrap" : "hidden"} bg-white rounded-tl-xl rounded-bl-xl z-20 h-screen px-5 py-20 shadow-xl transition-all duration-300 ease-in-out`}>
                <div className="flex flex-col items-center w-ful">
                    <Image src={ProfileImage3} alt={"profile"}
                           width={70} height={70}
                           className="rounded-full bg-red-300 mb-[16px]"
                    />
                    {/*TODO: Fetch the user's name from the API*/}
                    <p className="text-xl text-ultraMarine font-semibold m-0">John Deo</p>
                    <p className="text-base text-unselected m-0">Front Desk Officer</p>
                    <Image src={LineHorizontal} alt={"line"} height={1} className="my-10"/>
                </div>

                <div className="flex flex-col">
                    <p>Contact Info</p>
                    <div className="flex flex-col">
                        <p className="text-sm text-unselected m-0">Email Address</p>
                        <Image src={LineHorizontal} alt={"line"} height={1} className="my-2"/>
                        <p className="text-sm text-unselected m-0">Phone Number</p>

                    </div>
                </div>
            </div>
            <div
                className={`w-[302px] ${isCreateUser  ? "flex flex-col flex-nowrap" : "hidden"} bg-white rounded-tl-xl rounded-bl-xl z-20 h-screen px-5 py-20 shadow-xl transition-all duration-300 ease-in-out`}>
                <div className="flex flex-col items-center w-ful">
                    <Image src={ProfileImage3} alt={"profile"}
                           width={70} height={70}
                           className="rounded-full bg-red-300 mb-[16px]"
                    />
                    {/*TODO: Fetch the user's name from the API*/}
                    <p className="text-xl text-ultraMarine font-semibold m-0">Create User</p>
                    <p className="text-base text-unselected m-0">Front Desk Officer</p>
                    <Image src={LineHorizontal} alt={"line"} height={1} className="my-10"/>
                </div>

                <div className="flex flex-col">
                    <p>Contact Info</p>
                    <div className="flex flex-col">
                        <p className="text-sm text-unselected m-0">Email Address</p>
                        <Image src={LineHorizontal} alt={"line"} height={1} className="my-2"/>
                        <p className="text-sm text-unselected m-0">Phone Number</p>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Users;