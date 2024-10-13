
const authorize = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req?.user.roles)
			return res.sendStatus(401);
		const userRoles = req.user.roles;
		const allowed = userRoles.filter(role => allowedRoles.includes(role));
		if (!allowed.length)
			return res.sendStatus(401);
		next();
	};
};

module.exports = {
	authorize,
};