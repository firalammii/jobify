import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material'

import '../css/forms.scss';
import { Alert, Button } from '../components';
import { currencies, jobCategories, jobTypes, remoteOptions } from '../data/formData';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { aiURL, citiesURL, countriesURL, jobURL, statesURL } from '../api/urls';
import { createJobFailure, createJobStart, createJobSuccess } from '../redux/jobSlice';

const initial = {
	title: "",
	jobCategory: "",
	company: { id: "", companyName: "" },
	salary: { currency: "USD", minSalary: "", maxSalary: "" },
	location: { city: "", state: "", country: "", zipCode: "" },
	jobType: "",
	remoteOption: "",
	applyURL: "",
	experience: { minYears: "", maxYears: "" },
	postingDate: "",
	applicationDeadline: "",
	description: "",
};

function AddJob () {
	const inputRef = useRef("");
	const [jobDesc, setJobDesc] = useState({ visible: false, description: "" });
	const [formData, setFormData] = useState(initial);
	const [alert, setAlert] = useState({ visible: false, success: false, message: "" });

	const [companyId, setCompanyId] = useState("");

	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");


	const { companies, loading } = useSelector(state => state?.company);
	// console.log(companies)
	const dispatch = useDispatch();
	const { state: tobeEditted } = useLocation();
	const axios = useAxiosPrivate();

	const clearFields = () => setFormData(initial);
	const closeAlert = () => setAlert({ ...alert, visible: false });
	const openAlert = (success, msg) => setAlert({ visible: true, success: success, message: msg });

	const generateJobDesc = async () => {
		setJobDesc({ description: "", visible: false });
		if (!inValidInputs()) {
			const { data } = await axios.post(aiURL, formData);
			setJobDesc({ visible: true, description: data });
		}
	};

	useEffect(() => {
		if (tobeEditted)
			setFormData(tobeEditted);
		const getAllCountries = async () => {
			const { data } = await axios.get(countriesURL);
			if (!data.error)
				setCountries(data.data);
			else openAlert(false, data.data.msg);
		};
		getAllCountries();
	}, []);

	useEffect(() => {
		const getStates = async () => {
			const { data } = await axios.post(statesURL,
				JSON.stringify({ country })
			);
			if (!data.data.error)
				setStates(data.data.states);
			else openAlert(false, data.data.msg);
		};
		if (country)
			getStates();
	}, [country]);

	useEffect(() => {
		const getCities = async () => {
			const { data } = await axios.post(citiesURL,
				JSON.stringify({ country: country, state: state })
			);
			if (!data.error)
				setCities(data.data);
			else openAlert(false, data.msg);;
		};
		if (state && country)
			getCities();
	}, [state]);

	useEffect(() => {
		if (country && state && city) setFormData({ ...formData, location: { country, state, city } });
	}, [country, state, city]);

	useEffect(() => {
		if (companyId) {
			const companyObj = companies.find(comp => comp._id === companyId);
			setFormData({ ...formData, company: { id: companyId, companyName: companyObj?.companyName } });
		}
	}, [companyId]);

	const inValidInputs = (final = false) => {
		console.log(formData);
		if (
			!formData.title ||
			!formData.jobType ||
			!formData.company ||
			!formData.jobCategory ||
			!formData.salary ||
			!formData.remoteOption ||
			!formData.postingDate ||
			!formData.applicationDeadline
			// (final ? !formData.description : true)
		) {
			openAlert(false, "ooops Ther");
			// openAlert(false, "ooops There are Empty Fields in Form, All fields are Required !!");
			return true;
		}
		return false;
	};

	const handleChange = (event) => {
		const fieldName = event.target.attributes.parentid.value;
		if (fieldName)
			setFormData({ ...formData, [fieldName]: { ...formData[fieldName], [event.target.id]: event.target.value } });
		else if (event.target.type === "file")
			handleFileUpload(event);
		else
			setFormData({ ...formData, [event.target.id]: event.target.value });
	};

	const save = () => {
		setJobDesc({ ...jobDesc, visible: false });
		setState({ ...formData, description: jobDesc.description });
	};

	const handleSubmit = async (e) => {
		console.log(formData)
		e.preventDefault();
		if (inValidInputs(true)) {
			try {
				dispatch(createJobStart());
				const { data } = await axios.post(jobURL, formData);
				dispatch(createJobSuccess(data));
				openAlert(true, "Job is Posted Successfully !!");
				clearFields();
			} catch (error) {
				console.error(error);
				const msg = error.response?.data?.message;
				dispatch(createJobFailure(msg ? msg : error.message));
				openAlert(false, msg ? msg : error.message);
			}
		}
	};

	return (
		loading ?
			<p>loading</p>
			:
			<section className="gridfullcol grid11row w-full h-full overflow-auto  shadow-md rounded-md p-5 flex m-auto">
			{
					alert.visible ?
						<Alert
							returnFunction={closeAlert}
							message={alert.message}
							success={alert.success}
							style={{ width: "100%", marginTop: 100 }}
						/>
					:
						jobDesc.visible && !jobDesc.description ?
							<CircularProgress /> :
							jobDesc.visible && jobDesc.description ?
								<section className='p-5 shadow-md rounded-md bg-slate-200 h-3/4 w-3/4 justify-self-center overflow-auto fixed m-auto'>
									<textarea
										className='bg-white shadow-md rounded-md resize-none w-full border-none outline-none'
										cols={100}
										rows={20}
										value={jobDesc.description}
										onChange={(e) => setJobDesc({ ...jobDesc, description: e.target.value })}
									>
									</textarea>
									<div className='flex gap-5 justify-end mt-3' >
										<Button
											label="Back"
											style={{ backgroundColor: "gray", color: "white" }}
											onClick={() => setJobDesc({ visible: false, description: "" })}
										/>
										<Button
											label="Regenerate"
											style={{ backgroundColor: "blue", color: "white" }}
											onClick={generateJobDesc}
										/>
										<Button
											label="Save"
											style={{ backgroundColor: "green", color: "white" }}
											onClick={save}
										/>

									</div>

								</section>
								:
								<form className="form " onSubmit={handleSubmit} >
									<div className="inputs-con">

										<div className="label-input-con ">
											<label htmlFor="jobCategory" className="label"> Job Category</label>
											<select
												className='input '
												id='jobCategory'
												parentid=""
												value={formData.jobCategory}
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
												parentid=""
												// value={formData.company.companyName}
												onChange={(e) => setCompanyId(e.target.value)}
											// onChange={handleChange}
											>
												<option value={""}>none</option>
												{
													companies?.map(comp => (<option key={comp._id} value={comp._id}>{comp?.companyName}</option>))
												}
											</select>
										</div>
										<div className="label-input-con">
											<label htmlFor="title" className="label"> Job Title</label>
											<input
												className='input'
												type='text'
												id='title'
												parentid=""
												placeholder='Job Title'
												value={formData.title}
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
												parentid=""
												value={formData.jobType}
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
												parentid=""
												value={formData.remoteOption}
												onChange={handleChange}
											>
												{
													remoteOptions.map(opt => (<option key={opt.label} value={opt.value}>{opt.label}</option>))
												}
											</select>
										</div>

										<div className="label-input-con">
											<p className="label">Job Address</p>
											<div className='gap-5 grid grid-cols-3'>
												<div>
													<label htmlFor="country" className="label">Country</label>
													<select
														className='input overflow-auto'
														id='country'
														parentid="location"
														value={formData.location?.country ? formData.location?.country : country}
														onChange={(event) => setCountry(event.target.value)}
													>
														<option value="">Select one</option>
														{countries.map(item => (<option key={item.name + item.iso3} value={item.name}>{item.name}</option>))}
													</select>
												</div>

												<div>
													<label htmlFor="state" className="label">State</label>
													<select
														className='input'
														id='state'
														parentid="location"
														value={formData.location?.state ? formData.location?.state : state}
														onChange={(event) => setState(event.target.value)}
													>
														{/* <option value="">Select country</option> */}
														{states.map(item => (<option key={item.name + item.state_code} value={item.name}>{item.name}</option>))}
													</select>
												</div>
												<div>
													<label htmlFor="city" className="label">City</label>
													<select
														className='input'
														id='city'
														parentid="location"
														value={formData.location?.city ? formData.location?.city : city}
														onChange={(event) => setCity(event.target.value)}
													>
														{/* <option value="">Select state</option> */}
														{cities.map(item => (<option key={item} value={item}>{item}</option>))}
													</select>
												</div>
											</div>
										</div>

										<div className="label-input-con">
											<label htmlFor="postingDate" className="label"> Posting Date</label>
											<input
												className='input'
												type='date'
												id='postingDate'
												parentid=""
												placeholder='Posting Date'
												value={formData.postingDate}
												onChange={handleChange}
												required
												autoComplete='off'
											/>
										</div>
										<div className="label-input-con">
											<label htmlFor="applicationDeadline" className="label">Application Deadline Date</label>
											<input
												className='input'
												type='date'
												id='applicationDeadline'
												parentid=""
												placeholder='Deadline Date'
												value={formData.applicationDeadline}
												onChange={handleChange}
												required
												autoComplete='off'
											/>
										</div>

										<div className="label-input-con">
											<label htmlFor="applyURL" className="label"> Application URL <span style={{ textTransform: "lowercase" }} >https:// URL</span></label>
											<input
												className='input'
												type='url'
												id='applyURL'
												parentid=""
												placeholder='https://example.com'
												pattern="https://.*"
												value={formData.applyURL}
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
														value={formData.experience.minYears}
														onChange={handleChange}
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
														value={formData.experience.maxYears}
														onChange={handleChange}
														required
													/>
												</div>
											</div>
										</div>

										<div className="label-input-con">
											<p className="label">Salary Range Annually</p>
											<div className='flex gap-5'>
												<div>
													<label htmlFor="currency" className="label">Currency</label>
													<select
														className='input'
														id='currency'
														parentid="salary"
														value={formData.salary.currency}
														onChange={handleChange}
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
														parentid="salary"
														placeholder='Min Salary'
														value={formData.salary.minSalary}
														onChange={handleChange}
														required
													/>
												</div>
												<div>
													<label htmlFor="maxSalary" className="label">Max Salary</label>
													<input
														className='input small--input'
														type='number'
														id='maxSalary'
														parentid="salary"
														placeholder='Max Salary'
														value={formData.salary.maxSalary}
														onChange={handleChange}
														required
													/>
												</div>
											</div>
										</div>

										<div className="label-input-con ">
											<input
												className='input btn cancel-btn'
												type='button'
												value={tobeEditted ? !jobDesc ? "Generate New Job Description" : "Regenerate Job Description" : "Generate Job Description"}
												onClick={generateJobDesc}
												/>
										</div>
										<div className="label-input-con ">
											<input
												className='input btn form-btn'
												type='submit'
												// disabled={!formData.description}
												value={tobeEditted ? "Update Job" : "Post Job"}
											/>
										</div>
										{
											tobeEditted &&
											<div className="label-input-con">
												<input
													className='input btn cancel-btn'
													type='button'
													value="Cancel Update"
													onClick={() => navigate(-1)}
												/>
											</div>
										}

									</div>
								</form>

			}
			</section>
	);

};

export default AddJob;