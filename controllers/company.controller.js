const _ = require('lodash');
const Joi = require('joi');
const CompanyModel = require('../models/company.model');

const getAllCompanies = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	try {
		const companies = await CompanyModel.find()
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);
		// .populate("jobs");

		const totalNum = await CompanyModel.countDocuments();

		return res.status(200).json({
			length: companies.length,
			companies,
			currPage: page,
			totalPages: Math.ceil(totalNum / limit),
			rowsPerPage: limit,
			totalNum,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
};

const getCompany = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id)
			return res.status(400);
		const company = await CompanyModel.findById(id).populate("jobs");
		return res.status(200).json(company);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error });
	}
};

const createCompany = async (req, res) => {
	try {
		const companyObj = _.pick(req.body, ["location", "companyLogo", "description", "companyName", "companyType", "email", "website", "telNumber",]);

		if (companyObj.jobs && !companyObj.jobs.length)
			companyObj.jobs = [];

		const { error } = joiValidateCompany(companyObj);
		if (error)
			return res.status(400).json(error)

		const company = await CompanyModel.create(companyObj);
		return res.status(201).json(company);

	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
};

const updateCompany = async (req, res) => {
	try {
		const { id } = req.params;
		const companyObj = req.body;

		const foundCompany = await CompanyModel.findById(id);
		if (!foundCompany)
			return res.status(400).json({ message: "Companies does not found" });

		Object.assign(foundCompany, companyObj);
		const updated = await company.save();
		return res.status(201).json(updated);
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
};

const deleteCompany = async (req, res) => {
	try {
		const { id } = req.params;
		const foundCompany = await CompanyModel.findById(id);
		if (!foundCompany)
			return res.status(400).json({ message: "Companies does not found" });

		const deletedCompany = await CompanyModel.findByIdAndDelete(id);
		return res.status(200).json(deletedCompany);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error });
	}
};

const addJobs = async (job) => {
	try {
		const { company: id } = job;
		const company = await CompanyModel.findById(id);
		if (!company)
			return false;
		company.jobs.push(job);
		await company.save();
		return true;
	} catch (error) {
		console.error(error);
		return false;
		// return error;
	}
};

const joiValidateCompany = (compObj) => {
	const CompanySchema = Joi.object({
		companyLogo: Joi.string().required(),
		description: Joi.string().required(),
		companyName: Joi.string().required(),
		companyType: Joi.string().required(),
		website: Joi.string().required(),
		location: Joi.object({
			city: Joi.string().required(),
			country: Joi.string().required(),
			state: Joi.string().optional(),
			zipCode: Joi.string().optional(),
		}).optional(),
		telNumber: Joi.object({
			line: Joi.string().required(),
			mobile: Joi.string().optional(),
		}).optional(),
		email: Joi.string().required().email(),
		jobs: Joi.array().optional(),
	});

	return CompanySchema.validate(compObj);
}


module.exports = {
	getAllCompanies,
	getCompany,
	createCompany,
	updateCompany,
	deleteCompany,
	addJobs
};