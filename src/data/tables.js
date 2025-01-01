export const companiesTableHeads = [
    { id: 1, label: "No:", },
    { id: 2, label: "Logo", },
    { id: 3, label: "Company Name", },
    { id: 4, label: "Website", },
    { id: 5, label: "Tel Number", },
    { id: 6, label: "Location", },
];

export const companiesTableBody = [
    { isImg: true, name: "companyLogo" },
    { name: 'companyName' },
    { name: 'website' },
    { isObj: true, name: 'telNumber', sep: ' or ', subs: ['line', 'mobile'] },
    { isObj: true, name: 'location', sep: ', ', subs: ['city', 'country'] },

];

export const usersTableHeads = [
    { id: 1, label: "No:", },
    { id: 2, label: "Avatar", },
    { id: 3, label: "First Name", },
    { id: 4, label: "Last Name", },
    { id: 5, label: "Email", },
    { id: 6, label: "Roles", }
];
export const usersTableBody = [
    { name: "avatar", isImg: true, },
    { name: 'firstName' },
    { name: 'lastName' },
    { name: 'email' },
    { isArray: true, name: 'roles' }
];

export const jobsTableHeads = [
    { id: 1, label: "No:", },
    { id: 2, label: "Title", },
    { id: 3, label: "Job Type", },
    { id: 4, label: "Salary", },
    { id: 5, label: "Experience", },
    { id: 6, label: "Work Place", },
    { id: 7, label: "Location", },
    { id: 8, label: "Posted Date", },
    { id: 9, label: "Status", },
];

export const jobsTableBody = [
    { name: "title" },
    { name: 'jobType' },
    { isObj: true, isCurrency: true, name: 'salary', sep: ' - ', subs: ['minSalary', 'maxSalary'] },
    { isObj: true, name: 'experience', sep: ' - ', subs: ['minYears', 'maxYears'], suffix: ' Years' },
    { name: 'remoteOption' },
    { isObj: true, name: 'location', sep: ', ', subs: ['city', 'country'] },
    { name: 'createdAt' },
    { name: 'status' }
];


export const rowsOptions = [10, 20, 30];
// export const rowsOptions = [15, 30, 60];
// export const rowsOptions = [4, 8, 12];