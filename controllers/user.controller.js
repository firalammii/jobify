const Joi = require('joi');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const _ = require('lodash');

const UserModel = require('../models/user.model');
const { ROLES } = require('../config/roles');

const alreadyAdminMsg = "User is Already an Admin User";
const alreadySuperMsg = "User is Already A Super_Admin User";
const alreadyDeniedMsg = "User has No Any Access";
const roleSuccessMsg = "Making Super_Admin Operation is successful";
const adminSuccessMsg = "Making Super_Admin Operation is successful";
const denialSuccessMsg = "Removing All User Roles Operation is successful";
const removalSuccessMsg = "Deleting User Operation is successful";


const getAllUsers = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	try {
		const users = await UserModel.find()
			// .select({ password })
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);

		const totalNum = await UserModel.countDocuments();

		res.json({
			length: users.length,
			users,
			currPage: page,
			totalPages: Math.ceil(totalNum / limit),
			rowsPerPage: limit,
			totalNum
		});

	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await UserModel.findById(id);
		if (!user)
			return res.status(400).json({ message: "user doesnot exist" });
		return res.status(201).json(_.pick(user, ["firstName", "lastName", "email", "roles"]));
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error occured" });
	}
};

const createUser = async (req, res) => {
	try {
		const user = _.pick(req.body.user, ["firstName", "lastName", "email", "password", "roles"]);
		const { error } = validateUser(user);
		if (error)
			return res.status(409).json(error);
		const emailTaken = await UserModel.findOne({ email: user.email }).exec();
		if (emailTaken)
			return res.status(400).json({ message: "Email has to be Unique" });

		user.roles.push("USER");

		const generatedPassword =
			Math.random().toString(36).slice(-8) +
			Math.random().toString(36).slice(-8);

		if (user.password) {
			const encrytedPwd = await bcrypt.hash(user.password, 12);
			user.password = encrytedPwd;
		} else {
			const hashedPassword = await bcrypt.hash(generatedPassword, 12);
			user.password = hashedPassword;
		}

		const mailOptions = {
			from: process.env.GMAIL_EMAIL,
			to: user.email,
			subject: 'User profile is created',
			text: `Dear ${user.firstName}, your user profile is created successfully, roles: ${user.roles.join(', ')}.\n Here is the auto generated password ${generatedPassword} You can now login and reset your password if needed and upload a profile picture. \nthank you for being valuable employee`
		};

		const { fail, info } = notifyByEmail(mailOptions);
		if (fail) {
			console.log(fail);
			return res.status(400).json(fail);
		}

		const savedUser = await UserModel.create(user);

		return res.status(201).json({ ..._.pick(savedUser, ["firstName", "lastName", "email", "roles", "avatar", "_id"]), email_info: info });

	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error while Creating" });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { firstName, lastName, email, role, roles, newPassword, password, avatar } = req.body;

		const foundUser = await UserModel.findById(id);
		if (!foundUser)
			return res.status(400).json({ message: "cannot perform the operation, user does not exist !!" });

		if (role && rolesExists(foundUser.roles, role)) {
			const roleExistsMsg = `User is Already ${role === ROLES.admin ? 'An' : 'A'} ${role} User !!`;
			return res.status(400).json({ message: roleExistsMsg });
		} else if (role) {
			foundUser.roles.push(role);
			const upadatedUser = await foundUser.save();
			return res.status(201).json(upadatedUser);
		}

		if (newPassword && !validPwd(password, foundUser.password))
			return res.status(400).json({ message: "incorrect password" });

		if (firstName) foundUser.firstName = firstName;
		if (lastName) foundUser.lastName = lastName;
		if (email) foundUser.email = email;
		if (roles) foundUser.roles = roles;
		if (avatar) foundUser.avatar = avatar;
		if (newPassword) foundUser.password = await bcrypt(newPassword, 12);

		const upadatedUser = await foundUser.save();
		return res.status(201).json(upadatedUser);

	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const foundUser = await UserModel.findById(id);
		if (!foundUser)
			return res.status(400).json({ message: "cannot perform the operation, user does not exist !!" })
		const deletedUser = await UserModel.findByIdAndDelete(id);
		return res.status(201).json(deletedUser);
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);

	}
};

const validPwd = async (providedPwd, currPwd) => {
	return await bcrypt.compare(providedPwd, currPwd);
};
const rolesExists = (roles, role) => {
	console.log(roles, role);
	return roles.includes(role);

};

const isEmailTaken = async (email) => {
	const found = await UserModel.findOne({ email }).exec();
	return Boolean(found);
};
const validateUser = (userObj) => {
	const userJoiSchema = Joi.object({
		firstName: Joi.string().min(3).required(),
		lastName: Joi.string().min(3).required(),
		email: Joi.string().min(10).required(),
		password: Joi.string().optional(),
		roles: Joi.array().optional()
	});
	return userJoiSchema.validate(userObj);
};

const notifyByEmail = async (mailOptions) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.GMAIL_EMAIL,
			pass: process.env.GMAIL_PWD
		}
	});
	try {
		const info = await transporter.sendMail(mailOptions);
		return { fail: null, info };
	} catch (error) {
		console.error(error);
		return { fail: error, info: null };
	}
}

module.exports = {
	getAllUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
};