const { verify, sign } = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { tokenTimeouts } = require("../config/roles");


const handleRefreshToken = async (req, res) => {
	const refreshToken = req.cookies?.jobify_jwt_refresh_tkn;
	console.log(refreshToken)
	if (!refreshToken)
		return res.sendStatus(401);
	const foundUser = await UserModel.findOne({ refreshToken }).exec();
	if (!foundUser)
		return res.sendStatus(403);
	verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (err || decoded.username !== foundUser.username)
				return res.sendStatus(403);
			const accessToken = sign(
				{
					email: decoded.email,
					roles: decoded.roles
				}, process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: tokenTimeouts.accessTokenExpiry }
			);
			return res.status(200).json({ accessToken });
		}
	);
};

module.exports = handleRefreshToken;