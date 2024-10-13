const ROLES_LIST = {
	ADMIN: "ADMIN",
	SUPER: "SUPER_ADMIN",
	USER: "USER",
};

const tokenTimeouts = {
	accessTokenExpiry: "200s",
	refreshTokenTokenExpiry: "2000s"

}

module.exports = {
	ROLES_LIST,
	tokenTimeouts,
};