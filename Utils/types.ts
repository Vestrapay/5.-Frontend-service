import React, { InputHTMLAttributes, ReactElement, ReactNode } from "react"
import { MouseEventHandler } from "react"
import { AxiosRequestHeaders } from "axios";


export type DefaultButtonType = {
    handleClick?: MouseEventHandler<HTMLButtonElement> | undefined,
}

export type endpointTypes = {
    url: string;
    method: string;
    headers?: AxiosRequestHeaders | undefined;
    auth?: boolean
}

export type endPointlistTypes = {
    createUser: endpointTypes;
    loginUser: endpointTypes;
    changePassword: endpointTypes;
    forgotPassword: endpointTypes;
    dashboardStats: endpointTypes;
    dashboardAnalytics: endpointTypes;
    dashboardNotif: endpointTypes;
    dashboardTrans: endpointTypes;

    accountList: endpointTypes;
    createAccount: endpointTypes;
    updateAccount: endpointTypes;
    getAccount: endpointTypes;

    usersList: endpointTypes;
    updateUser: endpointTypes;
    getUser: endpointTypes;
    merchantCreateUser: endpointTypes;
    getAllRoles: endpointTypes;
    institutionsList: endpointTypes;
    createInstitution: endpointTypes;
    updateInstitution: endpointTypes;
    getInstitution: endpointTypes;
    getAllBanks: endpointTypes;
    transactionList: endpointTypes;
    settlementList: endpointTypes;
    settlementTransactionList: endpointTypes;
    banksList: endpointTypes;
    createBank: endpointTypes;
    updateBank: endpointTypes;
    getBank: endpointTypes;

    transactionVolumes: endpointTypes;
    listBranch: endpointTypes;
    createBranch: endpointTypes;
    deleteBranch: endpointTypes;
    deactivateBranch: endpointTypes;
    branchDetails: endpointTypes;
    listTerminals: endpointTypes;
    terminalDetails: endpointTypes;
    requestTerminal: endpointTypes;
    terminalStats: endpointTypes;
    getMerchantDetails: endpointTypes;
    getMerchant: endpointTypes;
    renameTerminal: endpointTypes;
    repairTerminal: endpointTypes;
    terminalUnlinkRequest: endpointTypes;
    terminalLinkRequest: endpointTypes;
    deactivateTerminal: endpointTypes;
    transSummary: endpointTypes;
    transHistory: endpointTypes;
    disburseFunds: endpointTypes;
    getMerchantAdmins: endpointTypes;
    topBranches: endpointTypes;
    getRoles: endpointTypes;
    selfOnboarding: endpointTypes;
    resetPassword: endpointTypes;
    branchTerminals: endpointTypes;
    generateOtp: endpointTypes;
    validateOtp: endpointTypes;
    uploadUtility: endpointTypes;
    uploadMOI: endpointTypes;
    uploadRegDoc: endpointTypes;
    listBanks: endpointTypes;
    branchTransactions: endpointTypes;
    creaeteMerchantAdmins: endpointTypes;
    creaeteMerchantUser: endpointTypes;
    getInstitutionDetails: endpointTypes;
    getInstitutionAdmins: endpointTypes;
    creaeteInstitutionUser: endpointTypes;
    editUser: endpointTypes;
    deleteUser: endpointTypes;
    deactivateUser: endpointTypes;
    creaeteInstitutionAdmins: endpointTypes;
    accNameEnquiry: endpointTypes;
    branchTransactionsStat: endpointTypes;
    eodReport: endpointTypes;
    singleTrans: endpointTypes;
}


export type urlPropTypes = {
    urlExtra?: string
    name?: string
    data?: any
    params?: any
    customHeaders?: {}
    action?: (data: any) => string[] | undefined
    errorAction?: (err: any) => string[] | undefined
    successDetails?: { title: any; text: any; icon: any; }
}

export type lecPropTypes = {
    children?: any
    textVariant?: string,
    containerVariant?: string,
    error?: string
    handleClick?: MouseEventHandler<HTMLDivElement> | undefined,
    handleClear?: MouseEventHandler<HTMLDivElement> | undefined,

}

export type stateTypes = {
    Abia: string[],

    Adamawa: string[],
    "Akwa Ibom": string[],
    Anambra: string[],
    Bauchi: string[],
    Benue: string[],
    Borno: string[],
    Bayelsa: string[],
    "Cross River": string[],
    Delta: string[],
    Ebonyi: string[],
    Edo: string[],
    Ekiti: string[],
    Enugu: string[],
    "Federal Capital Territory": string[],
    Gombe: string[],
    Imo: string[],
    Jigawa: string[],
    Kebbi: string[],
    Kaduna: string[],
    Kano: string[],
    Kogi: string[],
    Katsina: string[],
    Kwara: string[],
    Lagos: string[],
    Nassarawa: string[],
    Niger: string[],
    Ogun: string[],
    Ondo: string[],
    Osun: string[],
    Oyo: string[],
    Plateau: string[],
    Rivers: string[],
    Sokoto: string[],
    Taraba: string[],
    Yobe: string[],
    Zamfara: string[]
}