export const filterCondnsData = [
    {
        id: 1,
        label: "Category",
        selectedOption: null,
        options: [
            { label: "select none", name: undefined },
            { label: "Accounting and Finance", name: "Accounting and Finance" },
            { label: "Engineering", name: "Engineering" },
            { label: "Law", name: "Law" },
            { label: "Computational Studies", name: "Computational Studies" },
            { label: "Social Studies", name: "Social Studies" },
        ]
    },
    {
        id: 2,
        label: "Company Name",
        selectedOption: null,
        options: [
            { label: "select none", name: undefined },
            { label: "Name A-E", name: "A-E" },
            { label: "Name F-J", name: "F-J" },
            { label: "Name K-O", name: "K-O" },
            { label: "Name P-T", name: "P-T" },
            { label: "Name U-Z", name: "U-Z" },
        ]
    },
    {
        id: 3,
        label: "Employment Status",
        selectedOption: null,
        options: [
            { label: "select none", paymentStatus: undefined },
            { label: "Full time", paymentStatus: "Full time", },
            { label: "Part time", paymentStatus: "Part time", },
            { label: "Remote", paymentStatus: "Remote", },
            { label: "Contract", paymentStatus: "Contract", },
        ]
    },
    {
        id: 4,
        label: "Salary Range",
        selectedOption: null,
        options: [
            { label: "select none", usage: undefined },
            { label: "< 50000 USD", usage: "lt.1k" },
            { label: "< 80000 USD", usage: "lt.5k" },
            { label: "< 100000 USD", usage: "lt1k" },
            { label: "< 10K USD", usage: "lt10k" },
            { label: " >= 10K USD", usage: "gte10k" },
        ]
    },

];

export const filterCondnsPrecisely = [
    { id: 1, subcity: undefined, defined: false, },
    { id: 2, name: undefined, defined: false, },
    { id: 3, paymentStatus: undefined, defined: false, },
    { id: 4, usage: undefined, defined: false, },
];