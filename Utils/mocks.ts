export const dashReceiptTableHeader = [
    {
        name: 'Amount',
        variant: 'font-600 py-5 px-6',
        innerVariant: ''
    },
    {
        name: 'Amount Impacted',
        variant: 'font-600 py-5 px-6',
        innerVariant: ''
    },
    {
        name: 'Transaction Type',
        variant: 'font-600 py-5 px-6',
        innerVariant: ''
    },
    {
        name: 'Name',
        variant: 'font-600 py-5 px-6',
        innerVariant: ''
    },
    {
        name: 'Transaction Date',
        variant: 'font-600 py-5 px-6',
        innerVariant: ''
    }
]

export const dashBranchTableHeader = [
    {
        name: 'Name',
        variant: 'font-600 py-5 px-6',
        innerVariant: ''
    },
    {
        name: 'Value',
        variant: 'font-600 py-5 px-6',
        innerVariant: ''
    },
    {
        name: 'Amount',
        variant: 'font-600 py-5 px-6',
        innerVariant: ''
    }
]

export const accountsTableHeader = [
    {
        variant: 'font-600 py-5 px-6',
        name: 'Account Name & ID',
        innerVariant: ''
    },
    {
        variant: 'font-600 py-5 px-6',
        name: 'Account number',
        innerVariant: ''
    },
    {
        variant: 'font-600 py-5 px-6',
        name: 'Institution ID',
        innerVariant: ''
    },
    {
        variant: 'font-600 py-5 px-6',
        name: 'Account Type',
        innerVariant: ''
    },
    {
        variant: 'font-600 py-5 px-6',
        name: 'Reference',
        innerVariant: ''
    },
    {
        variant: 'font-600 py-5 px-6',
        name: 'Date Created',
        innerVariant: ''
    },
    {
        variant: 'font-600 py-5 px-6',
        name: 'Status',
        innerVariant: ''
    },
    {
        variant: 'font-600 py-5 px-6',
        name: 'Action',
        innerVariant: ''
    },
]

export const accountsResult = {
    "pageSize": 10,
    "pageNumberElements": 2,
    "pageTotalElements": 2,
    "pageTotalPages": 1,
    "pageNumber": 0,
    "result": [
        {
            "id": 5,
            "dateCreated": "2023-05-26T09:44:34.205+01:00",
            "dateModified": "2023-05-26T09:44:34.205+01:00",
            "delFlag": "N",
            "institutionId": 2,
            "accountNo": "6032585335",
            "accountName": "Kolawole Sola",
            "bvn": "22223314532",
            "apiReference": "adsf3salf",
            "validityTime": "2023-05-26T14:44:34.203+01:00",
            "accountType": "DYNAMIC",
            "isEnabled": null
        },
        {
            "id": 1,
            "dateCreated": "2023-05-26T09:27:46.328+01:00",
            "dateModified": "2023-05-26T11:57:48.963+01:00",
            "delFlag": "N",
            "institutionId": 2,
            "accountNo": "6063938345",
            "accountName": "Kolawole Sola",
            "bvn": "22223314532",
            "apiReference": "adsfdsalf",
            "validityTime": "2027-05-26T09:27:42.420+01:00",
            "accountType": "STATIC",
            "isEnabled": true
        }
    ]
}

export const accountTypes = [
    {
        name: "DYNAMIC",
        id: "DYNAMIC"
    },
    {
        name: "",
        id: ""
    },
]

export const timeUnits = [
    {
        name: "SECONDS",
        id: "SECONDS"
    },
    {
        name: "MINUTES",
        id: "MINUTES"
    },
    {
        name: "HOURS",
        id: "HOURS"
    },
]

export const usersResult = {
    "pageSize": 10,
    "pageNumberElements": 4,
    "pageTotalElements": 4,
    "pageTotalPages": 1,
    "pageNumber": 0,
    "result": [
        {
            "id": 4,
            "dateCreated": "2023-05-24T20:55:00.073+01:00",
            "dateModified": "2023-05-24T20:55:00.073+01:00",
            "delFlag": "N",
            "institutionId": 2,
            "firstName": "Mede",
            "lastName": "Omirin",
            "email": "aromavo.medeyonmi@gmail.com",
            "userName": "aromavo.medeyonmi@gmail.com",
            "isEnabled": true,
            "roleId": 2,
            "isPasswordChange": true,
            "level": "INSTITUTION",
            "createdBy": "superuser2"
        },
        {
            "id": 3,
            "dateCreated": "2023-05-24T08:44:01.783+01:00",
            "dateModified": "2023-05-24T08:44:01.783+01:00",
            "delFlag": "N",
            "institutionId": 0,
            "firstName": "Kolawole",
            "lastName": "Omirin",
            "email": "kelux007@gmail.com",
            "userName": "kelux007@gmail.com",
            "isEnabled": true,
            "roleId": 1,
            "isPasswordChange": true,
            "level": "SYSTEM",
            "createdBy": "superuser"
        },
        {
            "id": 2,
            "dateCreated": "2023-05-19T15:18:17.800+01:00",
            "dateModified": "2023-05-24T12:10:45.273+01:00",
            "delFlag": "N",
            "institutionId": null,
            "firstName": "Software",
            "lastName": "Development",
            "email": "omirin.kolawole@gmail.com",
            "userName": "superuser2",
            "isEnabled": true,
            "roleId": 1,
            "isPasswordChange": true,
            "level": "SYSTEM",
            "createdBy": "SYSTEM"
        },
        {
            "id": 1,
            "dateCreated": "2023-05-19T15:18:17.000+01:00",
            "dateModified": "2023-05-22T00:22:17.217+01:00",
            "delFlag": "N",
            "institutionId": null,
            "firstName": "Kolawole",
            "lastName": "Omirin",
            "email": "kolawole.emmanuel@3lineng.com",
            "userName": "superuser",
            "isEnabled": true,
            "roleId": 1,
            "isPasswordChange": true,
            "level": "SYSTEM",
            "createdBy": "SYSTEM"
        }
    ]
}

export const paymentMethods = [
    {
        name: "Cards",
        description: "Visa, Mastercard, Discover, Diners Club, Verve.",
        value: "CARD"
    },
    {
        name: "Bank transfer",
        description: "Visa, Mastercard, Discover, Diners Club, Verve.",
        value: "TRANSFER"
    },
    {
        name: "NQR",
        description: "A secure QR-code-based payments and collections platform for receiving and making payments",
        value: "NQR"
    },
    {
        name: "PaymentLink",
        description: "Allows you receive payments via a payment link.",
        value: "PAYMENTLINK"
    },
    {
        name: "USSD",
        description: "GTB, Zenith bank, First bank, Stanbic IBTC, Access bank.",
        value: "USSD"
    }
]

export const kyccategories = [
    {
        name: "Certificate of incorporation",
        description: "Visa, Mastercard, Discover, Diners Club, Verve.",
        value: "certificate_of_incorporation"
    },
    {
        name: "Register of shareholder",
        description: "Visa, Mastercard, Discover, Diners Club, Verve.",
        value: "register_of_shareholder"
    },
    {
        name: "Register of directors",
        description: "A secure QR-code-based payments and collections platform for receiving and making payments",
        value: "register_of_directors"
    },
    {
        name: "Memorandum and articles of association",
        description: "Allows you receive payments via a payment link.",
        value: "memorandum_and_articles_of_association"
    },
    {
        name: "Valid id of directors",
        description: "GTB, Zenith bank, First bank, Stanbic IBTC, Access bank.",
        value: "valid_id_of_directors"
    },
    {
        name: "Due diligence questionaire",
        description: "GTB, Zenith bank, First bank, Stanbic IBTC, Access bank.",
        value: "due_diligence_questionaire"
    }
]