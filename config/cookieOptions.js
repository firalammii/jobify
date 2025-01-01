const cookieOptions = {
	httpOnly: true,
	sameSite: "none",
	secure: true,
	maxAge: 24 * 60 * 60 * 1000, // 1 day
	path: "/api/auth",
};

const cookieName = 'jobify_jwt_refresh_tkn';

module.exports = { cookieOptions, cookieName };