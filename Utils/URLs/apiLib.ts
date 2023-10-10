import { AxiosRequestHeaders } from "axios";
import { endPointlistTypes } from "../types";


//API END-PONT DOCUMENTATIONx
let headers = {
    'Content-Type': 'application/json',
    crossDomain: true,
} as unknown as AxiosRequestHeaders;

let FileHeaders = {
    'Content-Type': 'multipart/form-data',
    crossDomain: true,
} as unknown as AxiosRequestHeaders;


export const endPoints: endPointlistTypes = {

    //Authentication
    loginUser: {
        url: '/api/v1/auth/login',
        method: 'POST',
        headers: headers,
    },
    changePassword: {
        url: '/api/v1/auth/change-password',
        method: 'POST',
        headers: headers,
        auth: true
    },
    resetPassword: {
        url: '/api/v1/auth/reset-password',
        method: 'POST',
        headers: headers
    },
    forgotPassword: {
        url: '/api/v1/auth/forgotPassword',
        method: 'POST',
        headers: headers,
        auth: true
    },

    //dashboardStats 
    dashboardAnalytics: {
        url: '/api/v1/dashboard/analytics',
        method: 'POST',
        headers: headers,
        auth: true
    },
    dashboardStats: {
        url: '/api/v1/dashboard/statistics',
        method: 'GET',
        headers: headers,
        auth: true
    },
    dashboardNotif: {
        url: '/api/v1/dashboard/notification',
        method: 'GET',
        headers: headers,
        auth: true
    },
    dashboardTrans: {
        url: '/api/v1/dashboard/get-recent-transactions',
        method: 'GET',
        headers: headers,
        auth: true
    },


    topBranches: {
        url: '/api/v1/merchantdashboard/topBranches',
        method: 'GET',
        headers: headers,
        auth: true
    },
    transactionVolumes: {
        url: '/api/v1/merchantdashboard/transactionVolumes',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //Business
    viewBusiness: {
        url: '/api/v1/business/view',
        method: 'GET',
        headers: headers,
        auth: true
    },
    updateBusiness: {
        url: '/api/v1/business/update',
        method: 'POST',
        headers: headers,
        auth: true
    },

    //Users 
    usersList: {
        url: '/api/v1/user/view-all-merchant-users',
        method: 'GET',
        headers: headers,
        auth: true
    },
    merchantCreateUser: {
        url: '/api/v1/user/merchant-create-user',
        method: 'POST',
        headers: headers,
        auth: true
    },

    createUser: {
        url: '/api/v1/user/register',
        method: 'POST',
        headers: headers,
        auth: false
    },

    updateUser: {
        url: '/api/v1/user/merchant-update-user',
        method: 'POST',
        headers: headers,
        auth: true
    },
    updateAUser: {
        url: '/api/v1/user/update',
        method: 'POST',
        headers: headers,
        auth: true
    },

    deleteUser: {
        url: '/api/v1/user/delete',
        method: 'POST',
        headers: headers,
        auth: true
    },
    deleteMerchantUser: {
        url: '/api/v1/user/delete-merchant-user',
        method: 'POST',
        headers: headers,
        auth: true
    },

    getUser: {
        url: '/api/v1/user/view-merchant-user',
        method: 'POST',
        headers: headers,
        auth: true
    },

    getAUser: {
        url: '/api/v1/user/view-user',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //Accounts
    accountList: {
        url: '/api/v1/account/view',
        method: 'GET',
        headers: headers,
        auth: true
    },
    createAccount: {
        url: '/api/v1/account/create',
        method: 'POST',
        headers: headers,
        auth: true
    },
    updateAccount: {
        url: '/api/v1/account/update',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    getAccount: {
        url: '/api/v1/account/getdetails',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //Institutions
    institutionsList: {
        url: '/api/v1/institution/view',
        method: 'GET',
        headers: headers,
        auth: true
    },
    createInstitution: {
        url: '/api/v1/institution/create',
        method: 'POST',
        headers: headers,
        auth: true
    },
    updateInstitution: {
        url: '/api/v1/institution/update',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    getInstitution: {
        url: '/api/v1/user/institution/single',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //Reports
    transactionList: {
        url: '/api/v1/transaction/view',
        method: 'GET',
        headers: headers,
        auth: true
    },

    settlementList: {
        url: '/api/v1/settlement/view',
        method: 'GET',
        headers: headers,
        auth: true
    },

    settlementTransactionList: {
        url: '/api/v1/settlement/view/transaction',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //Institutions
    banksList: {
        url: '/api/v1/bank/view',
        method: 'GET',
        headers: headers,
        auth: true
    },
    createBank: {
        url: '/api/v1/bank/create',
        method: 'POST',
        headers: headers,
        auth: true
    },
    updateBank: {
        url: '/api/v1/bank/update',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    getBank: {
        url: '/api/v1/user/bank/single',
        method: 'GET',
        headers: headers,
        auth: true
    },


    //Settings
    getAllRoles: {
        url: '/api/v1/role/getAll',
        method: 'GET',
        headers: headers,
        auth: true
    },
    getAllBanks: {
        url: '/api/v1/bank/getAll',
        method: 'GET',
        headers: headers,
        auth: true
    },
    uploadUtility: {
        url: '/api/v1/kyc/upload',
        method: 'POST',
        headers: headers,
        auth: true
    },



    generateOtp: {
        url: '/api/v1/auth/resend-otp',
        method: 'POST',
        headers: headers
    },
    validateOtp: {
        url: '/api/v1/auth/verify-otp',
        method: 'POST',
        headers: headers
    },

    uploadMOI: {
        url: '/api/v1/merchant/upload_means_of_identity',
        method: 'POST',
        headers: FileHeaders,
        auth: true
    },
    uploadRegDoc: {
        url: '/api/v1/merchant/upload_business_reg_doc',
        method: 'POST',
        headers: FileHeaders,
        auth: true
    },
    listBanks: {
        url: '/api/v1/banks/getBanks',
        method: 'GET',
        headers: headers,
        auth: true
    },


    //fund transfer

    accNameEnquiry: {
        url: '/api/v1/fundsTransfer/nameEnquiry',
        method: 'POST',
        headers: headers,
        auth: true
    },




    //branch management
    listBranch: {
        url: '/api/v1/merchant/listBranch',
        method: 'GET',
        headers: headers,
        auth: true
    },

    branchTransactions: {

        url: '/api/v1/transaction/getBranchTransactionHistory',
        method: 'GET',
        headers: headers,
        auth: true
    },

    branchTransactionsStat: {

        url: '/api/v1/transaction/getBranchTerminalTransactionStat',
        method: 'GET',
        headers: headers,
        auth: true
    },
    createBranch: {
        url: '/api/v1/branch/createBranch',
        method: 'POST',
        headers: headers,
        auth: true
    },
    deleteBranch: {
        url: '/api/v1/branch/deleteBranch',
        method: 'DELETE',
        headers: headers,
        auth: true
    },
    deactivateBranch: {
        url: '/api/v1/branch/deactivate',
        method: 'PATCH',
        headers: headers,
        auth: true
    },
    branchDetails: {
        url: '/api/v1/branch/getBranch',
        method: 'GET',
        headers: headers,
        auth: true
    },
    branchTerminals: {
        url: '/api/v1/branch/listTerminals',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //terminal management
    listTerminals: {
        url: '/api/v1/merchant/listTerminals',
        method: 'GET',
        headers: headers,
        auth: true
    },
    requestTerminal: {
        url: '/api/v1/terminal/requestTerminal',
        method: 'POST',
        headers: headers,
        auth: true
    },
    renameTerminal: {
        url: '/api/v1/terminal/renameTerminal',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    repairTerminal: {
        url: '/api/v1/terminal/terminalRepairRequest',
        method: 'POST',
        headers: headers,
        auth: true
    },
    terminalDetails: {
        url: '/api/v1/terminal/getTerminal',
        method: 'GET',
        headers: headers,
        auth: true
    },
    terminalStats: {
        url: '/api/v1/terminal/terminalStats',
        method: 'GET',
        headers: headers,
        auth: true
    },
    terminalLinkRequest: {
        url: '/api/v1/terminal/linkTerminal',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    terminalUnlinkRequest: {
        url: '/api/v1/terminal/terminalUnlinkRequest',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    deactivateTerminal: {
        url: '/api/v1/terminal/deactivateTerminal',
        method: 'PUT',
        headers: headers,
        auth: true
    },

    //merchant management
    getMerchantDetails: {
        url: '/api/v1/merchant/getMerchants/user/',
        method: 'GET',
        headers: headers,
        auth: true
    },

    getMerchant: {
        url: '/api/v1/merchant/getMerchants/user/',
        method: 'GET',
        headers: headers,
        auth: true
    },


    getMerchantAdmins: {
        url: '/api/v1/user/all',
        method: 'GET',
        headers: headers,
        auth: true
    },

    creaeteMerchantUser: {
        url: '/api/v1/user/create',
        method: 'POST',
        headers: headers,
        auth: true
    },

    creaeteMerchantAdmins: {
        url: '/api/v1/user/merchantAdmin',
        method: 'POST',
        headers: headers,
        auth: true
    },

    //merchant management
    getInstitutionDetails: {
        url: '/api/v1/merchant/getMerchants/user/',
        method: 'GET',
        headers: headers,
        auth: true
    },

    getInstitutionAdmins: {
        url: '/api/v1/user/all',
        method: 'GET',
        headers: headers,
        auth: true
    },

    creaeteInstitutionUser: {
        url: '/api/v1/user/create',
        method: 'POST',
        headers: headers,
        auth: true
    },

    deactivateUser: {
        url: '/api/v1/user/deactivateUser',
        method: 'PUT',
        headers: headers,
        auth: true
    },

    editUser: {
        url: '/api/v1/merchant/updateProfile',
        method: 'PATCH',
        headers: headers,
        auth: true
    },

    creaeteInstitutionAdmins: {
        url: '/api/v1/user/merchantAdmin',
        method: 'POST',
        headers: headers,
        auth: true
    },

    //Transaction Management
    transSummary: {
        url: '/api/v1/transaction/getMerchantBranchTransactionSummary',
        method: 'GET',
        headers: headers,
        auth: true
    },

    transHistory: {
        url: '/api/v1/transaction/getMerchantTransactionHistory',
        method: 'GET',
        headers: headers,
        auth: true
    },

    eodReport: {
        url: '/api/v1/report/endOfDayReport',
        method: 'GET',
        headers: headers,
        auth: true
    },

    singleTrans: {
        url: '/api/v1/transaction/getDetails',
        method: 'GET',
        headers: headers,
        auth: true
    },

    disburseFunds: {
        url: '/api/v1/fundsTransfer/disburse',
        method: 'POST',
        headers: headers,
        auth: true
    },

    //roles management
    getRoles: {
        url: '/api/v1/roles/all',
        method: 'GET',
        headers: headers,
        auth: true
    },

    selfOnboarding: {
        url: '/api/v1/merchant/selfOnboarding',
        method: 'POST',
        headers: headers,
    }

}
