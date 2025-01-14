const { JobModel } = require('../models/job.model');
const { addJobs } = require('./company.controller');

const getAllJobs = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const sortBy = req.query.orderBy?.split("_") || ["date", "desc"];
		const filters = {
			company: req.query.company,
			location: req.query.location,
			title: req.query.title,
			jobCategory: req.query.jobCategory,
			jobType: req.query.jobType,
			remoteOption: req.query.remoteOption,
			minSalary: req.query.minSalary,
			maxSalary: req.query.maxSalary,
			minYears: req.query.minYears,
			maxYears: req.query.maxYears,
			postingDate: req.query.postingDate,
		};

		const { company, location, jobCategory, title, jobType, remoteOption, minSalary, maxSalary, minYears, maxYears, } = filters;

		const searchQuery = {};

		if (company) searchQuery.company = company;

		if (location) searchQuery['location.city'] = { $regex: location, $options: 'i' };

		if (title) searchQuery.title = { $regex: title, $options: 'i' };

		if (jobCategory) searchQuery.jobCategory = { $regex: jobCategory, $options: 'i' };

		if (jobType) searchQuery.jobType = jobType;

		if (remoteOption) searchQuery.remoteOption = remoteOption;

		if (minSalary && maxSalary) {
			searchQuery['salary.minSalary'] = { $gte: minSalary };
			searchQuery['salary.maxSalary'] = { $lte: maxSalary };
		} else if (minSalary) {
			searchQuery['salary.minSalary'] = { $gte: minSalary };
		} else if (maxSalary) {
			searchQuery['salary.maxSalary'] = { $lte: maxSalary };
		}

		if (minYears && maxYears) {
			searchQuery['experience.minYears'] = { $gte: minYears };
			searchQuery['experience.maxYears'] = { $lte: maxYears };
		} else if (minYears) {
			searchQuery['experience.minYears'] = { $gte: minYears };
		} else if (maxYears) {
			searchQuery['experience.maxYears'] = { $lte: maxYears };
		}

		if (sortBy[0] !== "title")
			sortBy[0] = "createdAt";

		sortBy[1] = sortBy[1] === "desc" ? -1 : 1;

		const jobs = await JobModel.find(searchQuery)
			.sort({ [sortBy[0]]: sortBy[1] })
			.skip((page - 1) * limit)
			.limit(limit);

		const totalNum = await JobModel.countDocuments(searchQuery);

		res.json({
			length: jobs.length,
			jobs,
			currPage: page,
			rowsPerPage: limit,
			totalPages: Math.ceil(totalNum / limit),
			totalNum
		});

	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
};

const getJob = async (req, res) => {
	try {
		const { id } = req.params;
		const job = await JobModel.findById(id).populate('company');
		return res.status(200).json(job);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error });
	}
};

const createJob = async (req, res) => {
	try {
		const {
			title,
			jobCategory,
			company,
			salary,
			location,
			jobType,
			remoteOption,
			applyURL,
			experience,
			postingDate,
			description,
			applicationDeadline,
		} = req.body;

		// const jobObj = req.body;
		const job = await JobModel.create({
			title,
			jobCategory,
			company: company._id,
			salary,
			location,
			jobType,
			remoteOption,
			applyURL,
			experience,
			postingDate,
			description,
			applicationDeadline,
		});
		const addingSucceeded = await addJobs(job);
		if (!addingSucceeded) throw ({ error, company_message: "Company does not found" });
		return res.status(201).json(job);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error });
	}
};

const updateJob = async (req, res) => {
	try {
		const { id } = req.params;
		const jobObj = req.body;
		const job = await JobModel.findById(id);
		if (!job)
			return res.status(400).json({ message: "jobs does not found" });

		Object.assign(job, jobObj);
		job.company = jobObj.company._id;
		const updated = await (await job.save()).populate('company');
		return res.status(201).json(updated);
	} catch (error) {
		console.error(error);
		return res.status(500).json(error);
	}
};

const deleteJob = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedJob = await JobModel.findByIdAndDelete(id);
		return res.status(200).json(deletedJob);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error });
	}
};

module.exports = {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,

};