const _ = require('lodash');
const CompanyModel = require('../models/company.model');

const getAllCompanies = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	try {
		const companies = await CompanyModel.find()
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit)
			.populate("jobs");

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
		// const companyObj = _.pick(req.body, ["location", "company_name", "email", "website","tel_Number", "job_listings"]);
		const companyObj = req.body;
		// const logo = req.files;
		// const desc = req.files.description.name;
		// const logo = req.files["logo"][0];
		// const desc = req.files["description"][0];
		// return res.status(201).json(companyObj);
		// console.log(logo, desc);

		// companyObj.logo = logo.filename + path.extname(logo.originalname);
		// companyObj.description = desc.filename + path.extname(desc.originalname);

		const company = await CompanyModel.create(companyObj);
		return res.status(201).json(company);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error });
	}
};

const updateCompany = async (req, res) => {
	try {
		const { id } = req.params;
		const companyObj = req.body;
		const company = await CompanyModel.findById(id);
		if (!company)
			return res.status(400).json({ message: "Companies does not found" });

		Object.assign(company, companyObj);
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
		const jobs = company.jobs;
		jobs.push(job);
		company.jobs = jobs;
		await company.save();
		return true;
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
};


module.exports = {
	getAllCompanies,
	getCompany,
	createCompany,
	updateCompany,
	deleteCompany,
	addJobs
};