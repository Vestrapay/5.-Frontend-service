"use client";
import React, { useEffect, useState } from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { DataGrid, GridColDef, GridRowId, useGridApiRef } from "@mui/x-data-grid";
import { BsFillEyeFill, BsFillTrash3Fill, BsPencilSquare, BsThreeDots } from "react-icons/bs";

import UsersNavbar from "@/components/users/UsersNavbar";
import { UserDetailProps } from "@types";
import { useNewUserContext } from "../../context/newUserContext";
import UserDetails from "@/components/users/UserDetails";
import CreateUser from "@/components/users/CreateUser";
import EditUserDetails from "@/components/users/EditUserDetails";
import { PoperDropDown, TableStatus } from '@/components/reusables';
import DeleteUser from '@/components/users/DeleteUser';
import { useAuthContext } from "../../context/AuthContext";
import EnableAdmin from '@/components/users/EnableAdmin';
import { ComplianceController } from 'containers/complianceApi';
import ViewKyc from '@/components/users/ViewKyc';
import KycModal from '@/components/users/KycModal';

const Compliance = () => {

    const { userType } = useAuthContext()

    const [userTypeValue, setUserTypeValue] = useState("USER")

    useEffect(() => {
        setUserTypeValue(userType)
    }, [userType])

    const [isDropDownActive, setIsDropDownActive] = useState(false)

    const [isViewKycModal, setIsViewKycModal] = useState(false)

    const [selected, setSelected] = useState<number | string>("");

    const [selectedDetails, setSelectedDetails] = useState<UserDetailProps | any>();

    const [showDrop, setShowDrop] = useState<any>(false)

    const [showDelete, setShowDelete] = useState<any>(false);

    const [showEnable, setShowEnable] = useState<any>(false);

    const handleShowDrop = (id: number, off?: boolean) => {
        setShowDrop((prev: number) => off ? null : !prev ? id : (prev === id) ? null : id)
    }

    // const [isEditable, setIsEditable] = useState(false);

    const { isViewKyc, setIsViewKyc } = useNewUserContext();

    const { isLoading, isError, error, isSuccess, data, refetch } = ComplianceController("")

    const getRowData = (id: GridRowId) => {
        return apiRef.current?.getRow(id);
    }

    const apiRef = useGridApiRef();

    const usersListFields: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
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
            valueGetter: ({ row: { firstName, lastName } }: { row: { firstName: string, lastName: string } }) => `${firstName} ${lastName}`,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "businessName",
            headerName: "Business Name",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "userType",
            headerName: "User Type",
            flex: 1,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "requiredDocuments",
            headerName: "Uploaded Documents",
            flex: 1,
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
            renderCell: ({ row: { id, enabled } }: { row: { id: number, enabled: boolean } }) => {

                return (<PoperDropDown
                    placeHolder="Sort by"
                    label=""
                    variant=' z-1000 '
                    innerVariant="border-none py-1 h-fit rounded-xl outline-none focus:border font-normal z-1000"
                    containerVariant='w-max-content z-1000'
                    optionVariant="mr-0 pr-0 py-0 my-2"
                    optionContainerVariant={`right-7 absolute w-max bg-white h-fit z-500 shadow-md text-sm rounded-lg p-2.5 z-1000`}
                    onHandleChange={() => null}
                    checker={showDrop === id ? true : false}
                    list={true}
                    func={(off?: boolean) => {
                        handleShowDrop(id, off)
                    }}
                    value={""}
                    options={
                        ([
                            (<div key={1}
                                className='h-10 flex items-center text-center p-2 px-4 py-4 my-2 my-2 gap-2 rounded-md cursor-pointer min-w-max text-slate-700 bg-slate-100 hover:bg-slate-200'
                                onClick={() => {
                                    // Enable edit mode for the row
                                    console.log("View user with id: ", id) //TODO: Edit the user with this id
                                    setIsDropDownActive(false)
                                    setIsViewKyc(true)
                                }}>
                                {/* onClick={() => showDeactivateModal(item?.id)}> */}
                                <BsFillEyeFill className="w-4 h-4" /> <p
                                    className="w-full font-semibold text-left justify-start">View</p>
                            </div>),
                            (<div key={2}
                                className='h-10 flex items-center text-center p-2 px-4 py-4 my-2 my-2 gap-2 rounded-md cursor-pointer min-w-max text-slate-700 bg-slate-100 hover:bg-slate-200'
                                onClick={() => {
                                    // Enable edit mode for the row
                                    console.log("View user with id: ", id) //TODO: Edit the user with this id
                                    setIsDropDownActive(false)
                                    setIsViewKyc(false)
                                    setIsViewKycModal(true)
                                }}>
                                {/* onClick={() => showDeactivateModal(item?.id)}> */}
                                <p className="w-full font-semibold text-left justify-start">Complete</p>
                            </div>)
                        ])}
                    optionHeight={"h-fit top-10 "}
                >
                    <div className={`rounded w-full flex justify-center items-center relative z-0`}>
                        {(!showDrop || showDrop === id) ?
                            < BsThreeDots
                                onClick={() => {
                                    setIsDropDownActive(!isDropDownActive)
                                    setSelected(id)
                                }}
                                className={`text-2xl cursor-pointer`}
                            /> : ""}
                    </div>
                </PoperDropDown>
                )
            },
            sortable: false,
            hideSortIcons: true,
        }
    ]

    return (
        <>
            <DashboardLayout>
                <main
                    className="relative flex flex-1 flex-col px-10 pb-4 h-screen w-full overflow-x-visible transition-all duration-300 ease-in-out sm:px-12 pb-10 h-full">
                    <UsersNavbar type="Compliance and Documents" />
                    <DataGrid
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                    "address": false,
                                    "id": false,
                                }
                            }
                        }}
                        columns={usersListFields}
                        rows={data || []}
                        apiRef={apiRef}
                        // checkboxSelection={true}
                        onRowClick={(params) => {
                            console.log(params.row)
                            setSelectedDetails(params.row)
                        }}
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
                                    zIndex: 0,
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

                    <div
                        className={`w-full sm:w-2/3 xl:w-2/4 ${isViewKyc && selected ? "flex flex-col flex-nowrap" : "hidden"} absolute right-0 bg-white rounded-tl-xl rounded-bl-xl z-[2000] min-h-full p-5 shadow-xl transition-all duration-300 ease-in-out`}>
                        <ViewKyc data={selectedDetails} />
                    </div>
                </main>
            </DashboardLayout>
            <KycModal
                show={isViewKycModal}
                setShow={setIsViewKycModal}
                data={selectedDetails}
            />
        </>
    );
};

export default Compliance;
