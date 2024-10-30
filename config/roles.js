const ROLES = {
	admin: "ADMIN",
	super: "SUPER_ADMIN",
	user: "USER",
};

const tokenTimeouts = {
	accessTokenExpiry: "200s",
	refreshTokenTokenExpiry: "2000s"

}

module.exports = {
	ROLES,
	tokenTimeouts,
};