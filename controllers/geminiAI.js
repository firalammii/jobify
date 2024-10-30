const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const createJobDescAI = async (req, res) => {
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
		applicationDeadline,
	} = req.body;

	const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	const prompt = `Write a job description with the following parameters, 
	job title = ${title}, 
	hiring company name = ${company.companyName}, 
	job category = ${jobCategory}, 
	salary in currency= ${salary.currency}
	annual minimum salary = ${salary.minSalary},
	annual maximum salary = ${salary.maxSalary},
	minimum experience in years = ${experience.minYears},
	maximum experience in years = ${experience.maxYears},
	job location country= ${location.country},
	job location state= ${location.state},
	job location city= ${location.city},
	job type =${jobType},
	working place = ${remoteOption},
	date posted = ${postingDate},
	application dead line date : ${applicationDeadline}
	apply to = ${applyURL}`;

	try {
		const result = await model.generateContent(prompt);
		// console.log(result.response.text());
		return res.status(200).json(result.response.text());
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);

	}
};

module.exports = {
	createJobDescAI

};