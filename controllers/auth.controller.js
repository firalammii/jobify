const { compare } = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const UserModel = require("../models/user.model");
const { cookieOptions, cookieName } = require('../config/cookieOptions');

const tokenTimeouts = {
	accessTokenExpiry: "30s",
	refreshTokenExpiry: "2000s"
}

const handleLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password)
			return res.status(400).json({ message: "No Sufficient Data, Email and Password are Required" });

		const foundUser = await UserModel.findOne({ email }).exec();
		if (!foundUser)
			return res.status(404).json({ message: "Incorrect Email or Password" });

		const matchPwd = await compare(password, foundUser.password);
		if (!matchPwd)
			return res.status(404).json({ message: "Incorrect Email or Password" });

		const tokenObj = {
			email: foundUser.email,
			roles: foundUser.roles,
		};
		const accessToken = generateToken(tokenObj, process.env.ACCESS_TOKEN_SECRET, tokenTimeouts.accessTokenExpiry);
		const refreshToken = generateToken(tokenObj, process.env.REFRESH_TOKEN_SECRET, tokenTimeouts.refreshTokenExpiry);

		foundUser.refreshToken = refreshToken;
		await foundUser.save();

		const returnObj = {
			email,
			accessToken,
			refreshToken,
			roles: foundUser.roles,
			firstName: foundUser.firstName,
			lastName: foundUser.lastName,
			avatar: foundUser.avatar,
			_id: foundUser._id,
		};
		res.cookie(cookieName, refreshToken, cookieOptions);
		return res.status(200).json({ ...returnObj });
	} catch (error) {
		console.error(error);
		next(error);
	}
};

const handleLogout = async (req, res) => {
	try {
		const refreshToken = req.cookies[cookieName];
		if (!refreshToken)
			return res.sendStatus(204);
		const foundUser = await UserModel.findOne({ refreshToken }).exec();
		if (!foundUser) {
			res.clearCookie(cookieName, cookieOptions);
			return res.sendStatus(204);
		}
		foundUser.refreshToken = "";
		await foundUser.save();
		res.clearCookie(cookieName, { ...cookieOptions, maxAge: null });
		return res.sendStatus(204);
	} catch (error) {
		console.error(error);
		next(error);
	}
};

const handleRefresh = async (req, res, next) => {
	try {
		const refreshToken = req.cookies[cookieName];
		if (!refreshToken)
			return res.status(401).json({ message: "No refresh token is found" });

		const foundUser = await UserModel.findOne({ refreshToken }).exec();
		if (!foundUser)
			return res.status(403).json({ message: "No User with the Token is found" });

		verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, decoded) => {
				if (err) {
					return res.status(403).json({ message: err.message });
				}
				if (decoded.email !== foundUser.email) {
					return res.status(403).json({ message: "Email Does not match" });
				}

				const accessToken = generateToken(
					{ email: decoded.email, roles: decoded.roles },
					process.env.ACCESS_TOKEN_SECRET,
					tokenTimeouts.accessTokenExpiry
				);
				return res.status(200).json({ accessToken });
			}
		);

	} catch (error) {
		console.error(error);
		next(error);
	}
};


const generateToken = (obj, secret, duration) => {
	return sign(
		obj,
		secret,
		{ expiresIn: duration }
	);
};

module.exports = {
	handleLogin,
	handleLogout,
	handleRefresh
};