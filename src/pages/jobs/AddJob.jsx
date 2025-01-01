import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

// import '../../css/forms.scss';
// import { Alert, Button } from '../../components';
import { currencies, jobCategories, jobTypes, remoteOptions } from '../../data/formData';
import { URL } from '../../@api/urls';
import { createJob, updateJob, } from '../../@api/api/jobs_api';
import { API_STATUS } from '../../@api/promiseStatus';
import { statusIdle } from '../../redux/jobSlice';
import axios, { axiosDef } from '../../@api/axios';
import Form from '../../components/Form';
import * as yup from 'yup';

const initial = {
	title: "",
	jobCategory: "",
	company: { _id: "", companyName: "" },
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
const initials = {
	title: "",
	jobCategory: "",
	company: "",
	currency: "USD", minSalary: "", maxSalary: "",
	city: "", state: "", country: "",
	jobType: "",
	remoteOption: "",
	applyURL: "",
	minYears: "", maxYears: "",
	postingDate: "",
	applicationDeadline: "",
	description: "",
};

function AddJob () {
	const inputRef = useRef("");
	const [formData, setFormData] = useState(initial);
	const [jobDesc, setJobDesc] = useState({ visible: false, description: "" });
	const [alert, setAlert] = useState({ visible: false, success: false, message: "" });


	const [companyId, setCompanyId] = useState("");
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");

	const handleFormSubmit = (values, onSubmitProps) => {
	};
	const validationSchema = yup.object().shape({
		title: yup.string().required('required'),
		jobCategory: yup.string().required('required'),
		company: yup.string().required('required'),
		currency: yup.string().required('required'),
		minSalary: yup.number(),
		maxSalary: yup.number().required('required'),
		city: yup.string().required('required'),
		state: yup.string().required('required'),
		country: yup.string().required('required'),
		jobType: yup.string().required('required'),
		remoteOption: yup.string().required('required'),
		applyURL: yup.string().required('required'),
		minYears: yup.number(),
		maxYears: yup.number().required('required'),
		postingDate: yup.date(),
		applicationDeadline: yup.date().required('required'),
		description: yup.string().required('required'),

	});

	const { companies, } = useSelector(state => state.companies);
	const { targetJob, status } = useSelector(state => state.jobs);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { state: fromURL } = useLocation();

	const resetForm = () => setFormData(initial);
	const closeAlert = () => {
		dispatch(statusIdle());
		setAlert({ ...alert, visible: false });
		// navigate(-1);
	};
	const openAlert = (success, msg) => setAlert({ visible: true, success: success, message: msg });

	const generateJobDesc = async () => {
		setJobDesc({ description: "", visible: true });
		if (!inValidInputs()) {
			try {
				const { data } = await axios.post(URL.aiURL, formData);
				setJobDesc({ visible: true, description: data });
			} catch (error) {
				setJobDesc({ description: "", visible: false });
				openAlert(false, error.message);
			}
		} else {
			setJobDesc({ description: "", visible: false });
			openAlert(false, "Some Fields are required !!");
		}
	};

	useEffect(() => {
		if (fromURL?.edit)
			setFormData(targetJob);
		else resetForm();
		const getAllCountries = async () => {
			try {
				const { data } = await axiosDef.get(URL.countriesURL);
				if (!data.error)
					setCountries(data.data);
				else openAlert(false, data.data.msg);
			} catch (e) {
				console.error(e);
			}
		};
		getAllCountries();
	}, [targetJob, dispatch]);

	useEffect(() => {
		// const getStates = async () => {
		// 	const { data } = await axiosDef.post(URL.statesURL,
		// 		JSON.stringify({ country })
		// 	);
		// 	if (!data.data.error) {
		// 		setStates(data.data.states);
		// 	}
		// 	else openAlert(false, data.data.msg);
		// };
		// if (country)
		// 	getStates();
		setStates(country.state);
	}, [country]);

	useEffect(() => {
		const getCities = async () => {
			try {
				const { data } = await axiosDef.post(URL.citiesURL,
					JSON.stringify({ country: country, state: state })
				);
				if (!data.error) {
					setCities(data.data);
				}
				else openAlert(false, data.msg);
			} catch (e) {
				console.error(e);
			}
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
			setFormData({ ...formData, company: { _id: companyId, companyName: companyObj?.companyName, }, location: companyObj.location });
		}
	}, [companyId]);

	const inValidInputs = (final = false) => {
		return (
			!formData.title ||
			!formData.jobType ||
			!formData.company ||
			!formData.jobCategory ||
			!formData.salary.minSalary ||
			!formData.experience.minYears ||
			!formData.remoteOption ||
			// !formData.postingDate ||
			// !formData.applicationDeadline ||
			(final ? !formData.description : false)
		);
	};

	const handleChange = (event) => {
		const fieldName = event.target.attributes.parentid.value;
		if (fieldName)
			setFormData({ ...formData, [fieldName]: { ...formData[fieldName], [event.target.id]: event.target.value } });
		// else if (event.target.type === "file")
		// 	handleFileUpload(event);
		else
			setFormData({ ...formData, [event.target.id]: event.target.value });
	};

	const save = () => {
		setJobDesc({ ...jobDesc, visible: false });
		setFormData({ ...formData, description: jobDesc.description });
	};

	const handleSubmit = (e) => {
		console.log(formData);
		e.preventDefault();
		if (fromURL?.edit) {
			dispatch(updateJob(formData));
			openAlert(true, "Job is Updated Successfully !!");
		} else if (!inValidInputs(true)) {
			dispatch(createJob(formData));
			openAlert(true, "Job is Posted Successfully !!");
		} else openAlert(false, "Some Fields are required !!");
	};

	// const contentJobDesc = <section className='overlay'>
	// 	<div className='p-5 shadow-md rounded-md bg-slate-200 w-4/5 h-4/5 border'>
	// 		<textarea
	// 			className='bg-white shadow-md rounded-md resize-none w-full border-none outline-none'
	// 			cols={100}
	// 			rows={22}
	// 			value={jobDesc.description}
	// 			onChange={(e) => setJobDesc({ ...jobDesc, description: e.target.value })}
	// 		>
	// 		</textarea>
	// 		<div className='mt-3' >
	// 			<div className='flex gap-5 justify-end ' >
	// 				<Button
	// 					label="Back"
	// 					style={{ backgroundColor: "gray", color: "white" }}
	// 					onClick={() => setJobDesc({ visible: false, description: "" })}
	// 				/>
	// 				<Button
	// 					label="Regenerate"
	// 					style={{ backgroundColor: "blue", color: "white" }}
	// 					onClick={generateJobDesc}
	// 				/>
	// 				<Button
	// 					label="Save"
	// 					style={{ backgroundColor: "green", color: "white" }}
	// 					onClick={save}
	// 				/>
	// 			</div>
	// 		</div>
	// 	</div>
	// </section>;

	const formAddJob = <form className="form " onSubmit={handleSubmit} >
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
					value={formData.company?.companyName}
					// value={job.company.companyName}
					onChange={(e) => setCompanyId(e.target.value)}
				// onChange={handleChange}
				>
					<option value={formData?.company ? formData.company._id : ""}>{formData?.company?.companyName ? formData.company.companyName : "none"}</option>
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
							value={formData.location?.country ? formData.location.country : country}
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
							value={formData.location?.state ? formData.location.state : state}
							onChange={(event) => setState(event.target.value)}
						>
							{/* <option value="">Select country</option> */}
							{country?.states?.map(item => (<option key={item.name + item.state_code} value={item.name}>{item.name}</option>))}
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
					// value={format(new Date(job.postingDate), 'dd/mm/yyyy')}
					onChange={handleChange}
					autoComplete='off'
				/>
			</div>
			<div className="label-input-con">
				<label htmlFor="applicationDeadline" className="label">Application Deadline Date </label>
				<input
					className='input'
					type='date'
					id='applicationDeadline'
					parentid=""
					placeholder='Deadline Date'
					// value={format(new Date(formData.applicationDeadline), 'dd/mm/yyyy')}
					onChange={handleChange}
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
							value={formData.experience?.minYears}
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
							value={formData.experience?.maxYears || ""}
							onChange={handleChange}
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
							value={formData.salary?.currency}
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
							value={formData.salary?.minSalary}
							onChange={handleChange}
						// required
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
							value={formData.salary?.maxSalary || ""}
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>

			<div className="label-input-con ">
				<input
					className='input btn cancel-btn'
					type='button'
					value={fromURL?.edit ? !jobDesc ? "Generate New Job Description" : "Regenerate Job Description" : "Generate Job Description"}
					onClick={generateJobDesc}
				/>
			</div>
			<div className="label-input-con ">
				<input
					className='input btn form-btn'
					type='submit'
					// disabled={!formData.description}
					value={fromURL?.edit ? "Update Job" : "Post Job"}
				/>
			</div>
			{
				fromURL?.edit &&
				<div className="label-input-con">
					<button
						type='button'
						className='input btn cancel-btn'
						onClick={() => navigate(-1)}
					>
						Cancel Update
					</button>
				</div>
			}

		</div>
	</form>;

	// let pageContent = status === API_STATUS.loading ?
	// 	<CircularProgress />
	// 	: alert.visible ?
	// 		<Alert
	// 			returnFunction={closeAlert}
	// 			message={alert.message}
	// 			success={alert.success}
	// 			style={{ width: "100%", marginTop: 100 }}
	// 		/>
	// 		: jobDesc.visible && !jobDesc.description ?
	// 			<CircularProgress /> :
	// 			jobDesc.visible && jobDesc.description ?
	// 				contentJobDesc
	// 				: formAddJob;

	return (
		<section className=" w-full bg-slate-200 h-full overflow-auto  shadow-md rounded-md p-5">
			{
				// pageContent

			}
			<Form initials={initials} handleFormSubmit={handleFormSubmit} validation={validationSchema} />
		</section>
	);

};

export default AddJob;