const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const UserModel = require("../models/user.model");
const cookieOptions = require('../config/cookieOptions');
const { tokenTimeouts } = require("../config/roles");

const handleLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password)
			return res.status(400).json({ message: "No Sufficeint Data, Email and Password are Required" });
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

		const refreshToken = generateToken(tokenObj, process.env.REFRESH_TOKEN_SECRET, tokenTimeouts.refreshTokenTokenExpiry);

		foundUser.refreshToken = refreshToken;
		await foundUser.save();

		const returnObj = {
			email,
			accessToken,
			roles: foundUser.roles,
			firstName: foundUser.firstName,
			lastName: foundUser.lastName,
			avatar: foundUser.avatar,
			_id: foundUser._id,
		};
		res.cookie('jobify_jwt_refresh_tkn', refreshToken, cookieOptions);
		return res.status(200).json({ ...returnObj });
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

const handleLogout = async (req, res) => {
	try {
		const refreshToken = req.cookies?.jobify_jwt_refresh_tkn;
		if (!refreshToken)
			return res.sendStatus(204);
		const foundUser = await UserModel.findOne({ refreshToken }).exec();
		if (!foundUser) {
			res.clearCookie('jobify_jwt_refresh_tkn', cookieOptions);
			return res.sendStatus(204);
		}
		foundUser.refreshToken = "";
		await foundUser.save();
		res.clearCookie('jobify_jwt_refresh_tkn', cookieOptions);
		return res.sendStatus(204);

	} catch (error) {
		console.error(error);
		// return res.status(500).json(error);
		next(error);
	}
};

module.exports = {
	handleLogin,
	handleLogout,
};