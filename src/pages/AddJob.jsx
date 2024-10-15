import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import '../css/forms.scss';
import { Alert, Button } from '../components';
import { currencies, jobCategories, jobTypes, remoteOptions } from '../data/formData';

import {
	CitySelect,
	CountrySelect,
	StateSelect,
	LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from '../apis/axios';

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
	const [JobDesc, setJobDesc] = useState("");
	const [alertMsg, setAlertMsg] = useState("");
	const [success, setSuccess] = useState(false);

	const [countryid, setCountryid] = useState(0);
	const [stateid, setstateid] = useState(0);


	const companies = useSelector(state => state?.company?.companies);
	// console.log(companies)
	const dispatch = useDispatch();
	// const axios = useAxiosPrivate();

	useEffect(() => {
		if (tobeEditted)
			setState(tobeEditted);
		else
			setState(initial);
	}, []);


	useEffect(() => {
		if (state.company && state.title && state.applyURL && state.experience) {
			generateJoDesc();
		}
	}, [state]);

	const generateJoDesc = async () => {
		const prompt = {
			companyName: state.company?.companyName,
			title: state.title,
			website: state.company?.website,
			applyURL: state.applyURL
		};
		const result = await axios.post('/api/gemini', prompt);
		setJobDesc(result.data);
		console.log(result.data);
	};

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
	const handleLocation = (fieldName, value) => {
		setState({ ...state, location: { ...state.location, [fieldName]: value } });
	};
	const save = () => {
		setState({ ...state, description: JobDesc });
		setJobDesc("");
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

	console.log(state)

	return (
		<div className="AddComp grid h-full">
			{
				alertMsg ?
					<Alert returnFunction={setAlertMsg("")} message={alertMsg} success={success} />
					:
					JobDesc ?
						<section className='p-5 shadow-md rounded-md bg-slate-200 h-3/4 w-3/4 justify-self-center overflow-auto fixed'>
							<textarea
								className='bg-white shadow-md rounded-md resize-none w-full border-none outline-none'
								cols={100}
								rows={20}
								value={JobDesc}
								onChange={(e) => setJobDesc(e.target.value)}
							>
							</textarea>
							<div className='flex gap-5 justify-end mt-3' >
								<Button
									label="Regenerate"
									style={{ backgroundColor: "blue", color: "white" }}
									onClickFunction={generateJoDesc}
								/>
								<Button
									label="Save"
									style={{ backgroundColor: "green", color: "white" }}
									onClickFunction={save}
								/>
							</div>

						</section>
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
									<label htmlFor="company" className="label"> Company Name</label>
									<select
										className='input'
										id='company'
										value={state.company}
										onChange={handleChange}
									>
										<option value={""}>none</option>
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

								<div className='label-input-con'>
									<p className="label">Job Address</p>
									<div className='flex gap-5'>
										<div style={{ width: "100%" }}>
											<label htmlFor="country" className="label">Country</label>
											<CountrySelect
												id='country'
												parentid="location"
												onChange={(e) => {
													setCountryid(e.id);
													handleLocation("country", e.id);
												}}
												placeHolder="Select Country"
											/>
										</div>

										<div>
											<label htmlFor="state" className="label"> State</label>
											<StateSelect
												id='state'
												parentid="location"
												countryid={countryid}
												onChange={(e) => {
													setstateid(e.id);
													handleLocation("state", e.id);
												}}
												placeHolder="Select State"
											/>
										</div>
										<div >
											<label htmlFor="city" className="label"> City</label>
											<CitySelect
												id='city'
												countryid={countryid}
												stateid={stateid}
												onChange={() => handleLocation("city", e.id)}
												placeHolder="Select City"
												parentid="location"
											/>
										</div>
									</div>
								</div>

								<div className="label-input-con">
									<label htmlFor="postingDate" className="label"> Posting Date</label>
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
								{/* <div className="label-input-con">
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
								</div> */}

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