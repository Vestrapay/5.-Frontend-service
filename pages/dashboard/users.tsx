import React from 'react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {DataGrid} from "@mui/x-data-grid";
import {usersListData, usersListFields} from "@utils/tableSchema";

const Users = () => {
    return (
        <DashboardLayout>
            <main className="px-10 pb-4 h-screen">
                Users
                <DataGrid
                    columns={usersListFields}
                    rows={usersListData}
                    checkboxSelection={true}

                />
            </main>
        </DashboardLayout>
    );
};

export default Users;