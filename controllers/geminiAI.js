const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const createJobDescAI = async (req, res) => {
	console.log(req.body);
	const genAI = new GoogleGenerativeAI("AIzaSyCntrKL4IoLsqmlRBMWUosTpBBBQf2UPo0");
	// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	const prompt = `Write a job description job title = Front End Developer, company name = ADC Ethiopia, website Url= https://www.adcethiopia.org,`;
	try {
		const result = await model.generateContent(prompt);
		// console.log(result.response.text());
		return res.status(200).json(result);
	} catch (error) {
		console.log(error);
		return res.json(error);

	}
};

module.exports = {
	createJobDescAI

};