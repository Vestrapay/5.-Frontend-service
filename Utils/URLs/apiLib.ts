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
        url: '/api/v1/virtualservice/auth/login',
        method: 'POST',
        headers: headers,
    },
    changePassword: {
        url: '/api/v1/virtualservice/auth/changePassword',
        method: 'POST',
        headers: headers,
        auth: true
    },
    resetPassword: {
        url: '/api/v1/virtualservice/auth/resetPassword',
        method: 'POST',
        headers: headers,
        auth: true
    },
    forgotPassword: {
        url: '/api/v1/virtualservice/auth/forgotPassword',
        method: 'POST',
        headers: headers,
        auth: true
    },

    //Accounts
    accountList: {
        url: '/api/v1/virtualservice/account/view',
        method: 'GET',
        headers: headers,
        auth: true
    },
    createAccount: {
        url: '/api/v1/virtualservice/account/create',
        method: 'POST',
        headers: headers,
        auth: true
    },
    updateAccount: {
        url: '/api/v1/virtualservice/account/update',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    getAccount: {
        url: '/api/v1/virtualservice/account/getdetails',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //Users
    usersList: {
        url: '/api/v1/virtualservice/user/view',
        method: 'GET',
        headers: headers,
        auth: true
    },
    createUser: {
        url: '/api/v1/virtualservice/user/create',
        method: 'POST',
        headers: headers,
        auth: true
    },
    updateUser: {
        url: '/api/v1/virtualservice/user/update',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    getUser: {
        url: '/api/v1/virtualservice/user/view/single',
        method: 'GET',
        headers: headers,
        auth: true
    },


    //Institutions
    institutionsList: {
        url: '/api/v1/virtualservice/institution/view',
        method: 'GET',
        headers: headers,
        auth: true
    },
    createInstitution: {
        url: '/api/v1/virtualservice/institution/create',
        method: 'POST',
        headers: headers,
        auth: true
    },
    updateInstitution: {
        url: '/api/v1/virtualservice/institution/update',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    getInstitution: {
        url: '/api/v1/virtualservice/user/institution/single',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //Reports
    transactionList: {
        url: '/api/v1/virtualservice/transaction/view',
        method: 'GET',
        headers: headers,
        auth: true
    },

    settlementList: {
        url: '/api/v1/virtualservice/settlement/view',
        method: 'GET',
        headers: headers,
        auth: true
    },

    settlementTransactionList: {
        url: '/api/v1/virtualservice/settlement/view/transaction',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //Institutions
    banksList: {
        url: '/api/v1/virtualservice/bank/view',
        method: 'GET',
        headers: headers,
        auth: true
    },
    createBank: {
        url: '/api/v1/virtualservice/bank/create',
        method: 'POST',
        headers: headers,
        auth: true
    },
    updateBank: {
        url: '/api/v1/virtualservice/bank/update',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    getBank: {
        url: '/api/v1/virtualservice/user/bank/single',
        method: 'GET',
        headers: headers,
        auth: true
    },


    //Settings
    getAllRoles: {
        url: '/api/v1/virtualservice/role/getAll',
        method: 'GET',
        headers: headers,
        auth: true
    },
    getAllBanks: {
        url: '/api/v1/virtualservice/bank/getAll',
        method: 'GET',
        headers: headers,
        auth: true
    },


    generateOtp: {
        url: '/api/v1/virtualservice/otp/generate',
        method: 'POST',
        headers: headers,
        auth: true
    },
    validateOtp: {
        url: '/api/v1/virtualservice/otp/validate',
        method: 'POST',
        headers: headers,
        auth: true
    },
    uploadUtility: {
        url: '/api/v1/virtualservice/document/upload_file',
        method: 'POST',
        headers: FileHeaders,
        auth: true
    },
    uploadMOI: {
        url: '/api/v1/virtualservice/merchant/upload_means_of_identity',
        method: 'POST',
        headers: FileHeaders,
        auth: true
    },
    uploadRegDoc: {
        url: '/api/v1/virtualservice/merchant/upload_business_reg_doc',
        method: 'POST',
        headers: FileHeaders,
        auth: true
    },
    listBanks: {
        url: '/api/v1/virtualservice/banks/getBanks',
        method: 'GET',
        headers: headers,
        auth: true
    },


    //fund transfer

    accNameEnquiry: {
        url: '/api/v1/virtualservice/fundsTransfer/nameEnquiry',
        method: 'POST',
        headers: headers,
        auth: true
    },



    //dashboardStats
    dashboardStats: {
        url: '/api/v1/virtualservice/merchantdashboard/stats',
        method: 'GET',
        headers: headers,
        auth: true
    },
    topBranches: {
        url: '/api/v1/virtualservice/merchantdashboard/topBranches',
        method: 'GET',
        headers: headers,
        auth: true
    },
    transactionVolumes: {
        url: '/api/v1/virtualservice/merchantdashboard/transactionVolumes',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //branch management
    listBranch: {
        url: '/api/v1/virtualservice/merchant/listBranch',
        method: 'GET',
        headers: headers,
        auth: true
    },

    branchTransactions: {

        url: '/api/v1/virtualservice/transaction/getBranchTransactionHistory',
        method: 'GET',
        headers: headers,
        auth: true
    },

    branchTransactionsStat: {

        url: '/api/v1/virtualservice/transaction/getBranchTerminalTransactionStat',
        method: 'GET',
        headers: headers,
        auth: true
    },
    createBranch: {
        url: '/api/v1/virtualservice/branch/createBranch',
        method: 'POST',
        headers: headers,
        auth: true
    },
    deleteBranch: {
        url: '/api/v1/virtualservice/branch/deleteBranch',
        method: 'DELETE',
        headers: headers,
        auth: true
    },
    deactivateBranch: {
        url: '/api/v1/virtualservice/branch/deactivate',
        method: 'PATCH',
        headers: headers,
        auth: true
    },
    branchDetails: {
        url: '/api/v1/virtualservice/branch/getBranch',
        method: 'GET',
        headers: headers,
        auth: true
    },
    branchTerminals: {
        url: '/api/v1/virtualservice/branch/listTerminals',
        method: 'GET',
        headers: headers,
        auth: true
    },

    //terminal management
    listTerminals: {
        url: '/api/v1/virtualservice/merchant/listTerminals',
        method: 'GET',
        headers: headers,
        auth: true
    },
    requestTerminal: {
        url: '/api/v1/virtualservice/terminal/requestTerminal',
        method: 'POST',
        headers: headers,
        auth: true
    },
    renameTerminal: {
        url: '/api/v1/virtualservice/terminal/renameTerminal',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    repairTerminal: {
        url: '/api/v1/virtualservice/terminal/terminalRepairRequest',
        method: 'POST',
        headers: headers,
        auth: true
    },
    terminalDetails: {
        url: '/api/v1/virtualservice/terminal/getTerminal',
        method: 'GET',
        headers: headers,
        auth: true
    },
    terminalStats: {
        url: '/api/v1/virtualservice/terminal/terminalStats',
        method: 'GET',
        headers: headers,
        auth: true
    },
    terminalLinkRequest: {
        url: '/api/v1/virtualservice/terminal/linkTerminal',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    terminalUnlinkRequest: {
        url: '/api/v1/virtualservice/terminal/terminalUnlinkRequest',
        method: 'PUT',
        headers: headers,
        auth: true
    },
    deactivateTerminal: {
        url: '/api/v1/virtualservice/terminal/deactivateTerminal',
        method: 'PUT',
        headers: headers,
        auth: true
    },

    //merchant management
    getMerchantDetails: {
        url: '/api/v1/virtualservice/merchant/getMerchants/user/',
        method: 'GET',
        headers: headers,
        auth: true
    },

    getMerchant: {
        url: '/api/v1/virtualservice/merchant/getMerchants/user/',
        method: 'GET',
        headers: headers,
        auth: true
    },


    getMerchantAdmins: {
        url: '/api/v1/virtualservice/user/all',
        method: 'GET',
        headers: headers,
        auth: true
    },

    creaeteMerchantUser: {
        url: '/api/v1/virtualservice/user/create',
        method: 'POST',
        headers: headers,
        auth: true
    },

    creaeteMerchantAdmins: {
        url: '/api/v1/virtualservice/user/merchantAdmin',
        method: 'POST',
        headers: headers,
        auth: true
    },

    //merchant management
    getInstitutionDetails: {
        url: '/api/v1/virtualservice/merchant/getMerchants/user/',
        method: 'GET',
        headers: headers,
        auth: true
    },

    getInstitutionAdmins: {
        url: '/api/v1/virtualservice/user/all',
        method: 'GET',
        headers: headers,
        auth: true
    },

    creaeteInstitutionUser: {
        url: '/api/v1/virtualservice/user/create',
        method: 'POST',
        headers: headers,
        auth: true
    },

    deleteUser: {
        url: '/api/v1/virtualservice/user/deleteUser',
        method: 'PUT',
        headers: headers,
        auth: true
    },

    deactivateUser: {
        url: '/api/v1/virtualservice/user/deactivateUser',
        method: 'PUT',
        headers: headers,
        auth: true
    },

    editUser: {
        url: '/api/v1/virtualservice/merchant/updateProfile',
        method: 'PATCH',
        headers: headers,
        auth: true
    },

    creaeteInstitutionAdmins: {
        url: '/api/v1/virtualservice/user/merchantAdmin',
        method: 'POST',
        headers: headers,
        auth: true
    },

    //Transaction Management
    transSummary: {
        url: '/api/v1/virtualservice/transaction/getMerchantBranchTransactionSummary',
        method: 'GET',
        headers: headers,
        auth: true
    },

    transHistory: {
        url: '/api/v1/virtualservice/transaction/getMerchantTransactionHistory',
        method: 'GET',
        headers: headers,
        auth: true
    },

    eodReport: {
        url: '/api/v1/virtualservice/report/endOfDayReport',
        method: 'GET',
        headers: headers,
        auth: true
    },

    singleTrans: {
        url: '/api/v1/virtualservice/transaction/getDetails',
        method: 'GET',
        headers: headers,
        auth: true
    },

    disburseFunds: {
        url: '/api/v1/virtualservice/fundsTransfer/disburse',
        method: 'POST',
        headers: headers,
        auth: true
    },

    //roles management
    getRoles: {
        url: '/api/v1/virtualservice/roles/all',
        method: 'GET',
        headers: headers,
        auth: true
    },

    selfOnboarding: {
        url: '/api/v1/virtualservice/merchant/selfOnboarding',
        method: 'POST',
        headers: headers,
    }

}
