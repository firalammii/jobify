import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import '../css/forms.scss';
import { Alert } from '../components';
import axios, { BASE_URL } from '../apis/axios';
import { countries, currencies, jobCategories, jobTypes, remoteOptions } from '../data/formData';

const initial = {
	title: "",
	jobCategory: "",
	company: "",
	salary: { currency: "USD", minSalary: "", maxSalary: "" },
	location: { city: "", state: "", country: "", zipCode: "" },
	jobType: "",
	remoteOption: "",
	applyURL: "",
	experience: { minYears: "", maxYears: "" },
	skills: [],
	postingDate: "",
	applicationDeadline: "",
	description: "",
};

function AddJob ({ tobeEditted }) {
	const inputRef = useRef("");

	const [state, setState] = useState(initial);
	const [alertMsg, setAlertMsg] = useState("");
	const [success, setSuccess] = useState(false);

	const companies = useSelector(state => state?.company?.companies);
	console.log(companies)
	const dispatch = useDispatch();

	useEffect(() => {
		if (tobeEditted)
			setState(tobeEditted);
		else
			setState(initial);
	}, []);

	useEffect(() => {
		// inputRef.current.focus();
	}, []);

	const clearFields = () => {
		setState(initial);
	};

	const handleChange = (e) => {
		setState({ ...state, [e.target.id]: e.target.value });
	};
	const handleObjectChange = (e) => {
		const fieldName = e.target.attributes.parentid.value;
		setState({ ...state, [fieldName]: { ...state[fieldName], [e.target.id]: e.target.value } });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { title, jobType, company, jobCategory, salary, skills, remoteOption, posting_date, applicationDeadline, description } = state;
		const validInputs = !title || !jobType || !company || !jobCategory || !salary || !posting_date || !applicationDeadline || !description;
		if (!validInputs) {
			setAlertMsg("ooops There is Empty Field in Form, All fields are Required !!");
			return;
		}
		setAlertMsg("");

		state.skills = skills.split(",");
		try {
			// const response = await axios.post(`${BASE_URL}/jobs`, state, {
			// 	headers: { 'Content-Type': 'application/json' },
			// });
			// console.log(response);
			// dispatch(createCompany(state, auth?.accessToken));
			setSuccess(true);
			setAlertMsg("Job is Posted Successfully !!");
			clearFields();
		} catch (err) {
			console.log(err);
			setSuccess(false);
			setAlertMsg('Sorry !! Posting the Job is Failed, Try Again Later !');
		}
	};

	// 	const url = "https://api.edenai.run/v2/workflow/51183067-ed82-4092-a706-9887eb3e938e/execution/";
	// 	const payload = {
	// 		"input": "generate an image of a beautifull house"
	// 	};
	// 
	// 	const response = await fetch(url, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZjkyOThhNDgtNGJiZi00NGY2LWJkYTktMjY4ZTU1ODhiNmY5IiwidHlwZSI6ImFwaV90b2tlbiJ9.KOzggklJIzork77aGl9_hEiBlDOY4DgcgDhShWzUOT8"
	// 		},
	// 		body: JSON.stringify(payload)
	// 	});
	// 	const result = await response.json();


	return (
		<div className="AddComp">
			{
				alertMsg ?
					<Alert returnFunction={setAlertMsg("")} message={alertMsg} success={success} />
					:
					<form className="form" onSubmit={handleSubmit} >
						<div className="inputs-con">
							<div className="label-input-con">
								<label htmlFor="jobCategory" className="label"> Job Category</label>
								<select
									className='input'
									id='jobCategory'
									value={state.jobCategory}
									onChange={handleChange}
								>
									{
										jobCategories.map(jobCat => (<option key={jobCat.label} value={jobCat.value}>{jobCat.label}</option>))
									}
								</select>
							</div>

							<div className="label-input-con">
								<label htmlFor="companyName" className="label"> Company Name</label>
								<select
									className='input'
									id='companyName'
									value={state.companyName}
									onChange={handleChange}
								>
									{
										companies?.map(comp => (<option key={comp?._id} value={comp}>{comp?.companyName}</option>))
									}
								</select>
							</div>
							<div className="label-input-con">
								<label htmlFor="title" className="label"> Job Title</label>
								<input
									className='input'
									type='text'
									id='title'
									placeholder='Job Title'
									value={state.title}
									onChange={handleChange}
									required
									autoComplete='on'
								/>
							</div>

							<div className="label-input-con">
								<label htmlFor="jobType" className="label"> Job Type</label>
								<select
									className='input'
									id='jobType'
									value={state.jobType}
									onChange={handleChange}
								>
									{
										jobTypes.map(type => (<option key={type.label} value={type.value}>{type.label}</option>))
									}
								</select>
							</div>

							<div className="label-input-con">
								<label htmlFor="remoteOption" className="label"> Remote Option</label>
								<select
									className='input'
									id='remoteOption'
									value={state.remoteOption}
									onChange={handleChange}
								>
									{
										remoteOptions.map(remoteOption => (<option key={remoteOption.label} value={remoteOption.value}>{remoteOption.label}</option>))
									}
								</select>
							</div>

							<div className="label-input-con">
								<label htmlFor="posting_date" className="label"> Posting Date</label>
								<input
									className='input'
									type='date'
									id='postingDate'
									placeholder='Posting Date'
									value={state.postingDate}
									onChange={handleChange}
									required
									autoComplete='on'
								/>
							</div>
							<div className="label-input-con">
								<label htmlFor="applicationDeadline" className="label">Application Deadline Date</label>
								<input
									className='input'
									type='date'
									id='applicationDeadline'
									placeholder='Deadline Date'
									value={state.applicationDeadline}
									onChange={handleChange}
									required
									autoComplete='on'
								/>
							</div>

							<div className="label-input-con">
								<label htmlFor="applyURL" className="label"> Application URL <span style={{ textTransform: "lowercase" }} >https:// URL</span></label>
								<input
									className='input'
									type='url'
									id='applyURL'
									placeholder='https://example.com'
									pattern="https://.*"
									// size="100"
									value={state.applyURL}
									onChange={handleChange}
									required
									autoComplete='on'
								/>
							</div>


							<div className="label-input-con">
								<p className="label">Experience Range in Years</p>
								<div className='flex gap-5'>
									<div>
										<label htmlFor="minYears" className="label">Min Years</label>
										<input
											className='input small--input'
											type='number'
											id='minYears'
											parentid="experience"
											placeholder='Min Years'
											value={state.experience.minYears}
											onChange={handleObjectChange}
											required
										/>
									</div>
									<div >
										<label htmlFor="maxYears" className="label">Max Years</label>
										<input
											className='input small--input'
											type='number'
											id='maxYears'
											parentid="experience"
											placeholder='Max Years'
											value={state.experience.maxYears}
											onChange={handleObjectChange}
											required
										/>
									</div>
								</div>
							</div>

							{/* <div className="label-input-con ">
								<label htmlFor="skills" className="label"> Preferred Skills</label>
								<textarea
									className='input textarea'
									type='text'
									id='skills'
									cols={50}
									rows={4}
									value={state.skills}
									onChange={handleChange}
									required
									autoComplete='on'
								/>
							</div> */}
							<div className="label-input-con">
								<label htmlFor="skills" className="label"> Preferred Skills </label>
								<input
									className='input'
									type='text'
									id='skills'
									placeholder='eg. Communication, Motivation'
									value={state.skills}
									onChange={handleChange}
									required
									autoComplete='on'
								/>
							</div>

							<div className="label-input-con">
								<p className="label">Salary Range Annually</p>
								<div className='flex gap-5'>
									<div>
										<label htmlFor="currency" className="label">Currency</label>
										<select
											className='input'
											id='currency'
											value={state.salary.currency}
											parentid="salary"
											onChange={handleObjectChange}
										>
											{currencies.map(currency => (<option key={currency} value={currency}>{currency}</option>))}
										</select>
									</div>

									<div>
										<label htmlFor="minSalary" className="label">Min Salary</label>
										<input
											className='input small--input'
											type='number'
											id='minSalary'
											placeholder='Min Salary'
											value={state.salary.minSalary}
											parentid="salary"
											onChange={handleObjectChange}
											required
										/>
									</div>
									<div>
										<label htmlFor="maxSalary" className="label">Max Salary</label>
										<input
											className='input small--input'
											type='number'
											id='maxSalary'
											placeholder='Max Salary'
											value={state.salary.maxSalary}
											parentid="salary"
											onChange={handleObjectChange}
											required
										/>
									</div>
								</div>
							</div>

							<div className="label-input-con">
								<p className="label">Job Address</p>

								<div className='flex gap-5'>
									<div>
										<label htmlFor="city" className="label">City</label>
										<input
											className='input small--input'
											type='text'
											id='city'
											placeholder='City'
											value={state.location.city}
											parentid="location"
											onChange={handleObjectChange}
											required
										/>
									</div>
									<div>
										<label htmlFor="state" className="label">State</label>
										<input
											className='input small--input'
											type='text'
											id='state'
											placeholder='Min Salary'
											value={state.location.state}
											parentid="location"
											onChange={handleObjectChange}
										/>
									</div>
									<div>
										<label htmlFor="country" className="label">Country</label>
										<select
											className='input'
											id='country'
											value={state.location.country}
											parentid="location"
											onChange={handleObjectChange}
											required
										>
											<option value={"	"}>Ethiopia</option>
											{/* {countries.map(country => (<option key={country} value={country}>{country}</option>))} */}
										</select>
									</div>

									<div>
										<label htmlFor="zipCode" className="label">Zip Code</label>
										<input
											className='input small--input'
											type='text'
											id='zipCode'
											placeholder='Zip Code'
											value={state.location.zipCode}
											parentid="location"
											onChange={handleObjectChange}
										/>
									</div>
								</div>

							</div>

							{/* <div className="label-input-con">
								<label htmlFor="description" className="label"> Job Description</label>
								<textarea
									className='input textarea'
									type='text'
									cols={50}
									rows={4}
									id='description'
									placeholder='AI Generated give me keys'
									value={state.description}
									onChange={handleChange}
									required
									autoComplete='on'
								/>
							</div> */}

							<div className="label-input-con ">
								<input
									className='input form-btn'
									type='submit'
									value={tobeEditted ? "Update Job" : "Post Job"}
								/>
							</div>

						</div>
					</form>

			}
		</div>
	);

};

export default AddJob;