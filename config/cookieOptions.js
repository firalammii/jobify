const cookieOptions = {
	httpOnly: true,
	origin: "http://localhost:3500",
	sameSite: "none",
	// maxAge: 24 * 60 * 60 * 1000
};

module.exports = cookieOptions;