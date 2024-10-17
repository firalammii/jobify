const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const UserModel = require('../models/user.model');

const getAllUsers = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	try {
		const users = await UserModel.find()
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);

		const totalNum = await UserModel.countDocuments();

		res.json({
			length: users.length,
			users,
			currPage: page,
			totalPages: Math.ceil(totalNum / limit),
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
		const user = _.pick(req.body, ["firstName", "lastName", "email", "password", "roles"]);
		const { error } = validateUser(user);
		if (error)
			return res.status(409).json(error);
		const emailTaken = await UserModel.findOne({ email: user.email }).exec();
		if (emailTaken)
			return res.status(400).json({ message: "Email has to be Unique" }); // AI text generation
		user.roles.push("USER");
		if (user.password) {
			const encrytedPwd = await bcrypt.hash(user.password, 12);
			user.password = encrytedPwd;
		}
		const savedUser = await UserModel.create(user);
		// const savedUser = await UserModel.create({ ...user, password: encrytedPwd });

		return res.status(201).json(_.pick(savedUser, ["firstName", "lastName", "email", "roles", "avatar", "_id"]));
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error while Creating" });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { firstName, lastName, email, roles, newPassword, password } = req.body;
		console.log(req.body.roles);
		const foundUser = await UserModel.findById(id);
		if (!foundUser)
			return res.status(400).json({ message: "cannot perform the operation" });

		const dublicateEmail = await isEmailTaken(email);
		if (email && dublicateEmail)
			return res.status(400).json({ message: "Email has to be Unique" });

		if (newPassword && validPwd(password))
			return res.status(400).json({ message: "incorrect password" });

		if (req.body.firstName) foundUser.firstName = req.body.firstName;
		if (req.body.lastName) foundUser.lastName = req.body.lastName;
		if (req.body.email) foundUser.email = req.body.email;
		if (req.body.roles) foundUser.roles = req.body.roles;
		if (req.body.pwd) foundUser.pwd = req.body.newPassword && req.body.password ? await bcrypt(req.body.newPassword, 12) : foundUser.password;

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
		const deletedUser = await UserModel.findByIdAndDelete(id);
		return res.status(201).json(deletedUser);
	} catch (error) {

	}
};

const validPwd = async (providedPwd, currPwd) => {
	const isPwdMatches = await bcrypt.compare(providedPwd, currPwd);
	return isPwdMatches;
};

const isEmailTaken = async (email) => {
	const found = await UserModel.findOne({ email }).exec();
	return Boolean(found);
};
const validateUser = (userObj) => {
	const userJoiSchema = Joi.object({
		firstName: Joi.string().min(3).required(),
		lastName: Joi.string().min(3).required(),
		email: Joi.string().min(3).required(),
		password: Joi.string().min(4).optional(),
		roles: Joi.array().optional()
	});
	return userJoiSchema.validate(userObj);
};

module.exports = {
	getAllUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
};