const cookieOptions = {
	httpOnly: true,
	// origin: "http://localhost:3500",
	sameSite: "none",
	secure: true,
	maxAge: 24 * 60 * 60 * 1000, // 1 day
	// maxAge: 3 * 60 * 1000,
	path: "/api/auth",
};

const cookieName = 'jobify_jwt_refresh_tkn';

module.exports = { cookieOptions, cookieName };