
export const LINK_TO = {
	//open routes
	home: "/home",
	about: "about",
	signIn: "/signin",
	register: "/register",
	unauthorized: "/unauthorized",
	missing: "/missing",
	userProfile: "/user/profile",

	//jobs
	listJobs: "/jobs/list",
	addJob: "/jobs/add",
	editJob: "/jobs/edit",
	viewJob: "/jobs/details",
	searchJob: "/jobs/search",

	//companies
	listCompanies: "/companies/list",
	addCompany: "/companies/add",
	editCompany: "/companies/edit",
	viewCompany: "/companies/details",
	searchCompany: "/companies/search",

	//users
	listUsers: "/users/list",
	addUser: "/users/add",
	editUser: "/users/edit",
	viewUser: "/users/details",
	searchUser: "/users/search",

};

export const links = [
	{ label: "Home", to: LINK_TO.home, active: false },
	{ label: "About", to: LINK_TO.about, active: false },
	{ label: "SignIn", to: LINK_TO.signIn, active: false },
	{ label: "Search", to: LINK_TO.searchJob, active: false },
	{ label: "Jobs", to: LINK_TO.listJobs, active: false },
	{ label: "Firms", to: LINK_TO.listCompanies, active: false },
	{ label: "Users", to: LINK_TO.listUsers, active: false },
];