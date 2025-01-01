import { useState, useEffect, useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Alert } from '../../components';
import { companyTypes, } from '../../data/formData';
import '../../css/forms.scss';
import { axiosDef } from '../../@api/axios';
import { app } from '../../firebase';
import { URL } from '../../@api/urls';

const initial = {
	companyType: "",
	companyName: "",
	location: { city: "", state: "", country: "", zipCode: "" },
	telNumber: { mobile: "", line: "" },
	website: "",
	email: "",
	companyLogo: "",
	description: ""
};
const initFileErr = {
	companyLogo: false,
	description: false
};
function AddCompany () {
	const inputRef = useRef("");
	const [formData, setFormData] = useState(initial);
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [alert, setAlert] = useState({ visible: false, success: false, message: "" });
	const [fileError, setFileError] = useState(initFileErr);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { state: tobeEditted } = useLocation();

	const clearFields = () => setFormData(initial);
	const closeAlert = () => setAlert({ ...alert, visible: false });
	const openAlert = (success, msg) => setAlert({ visible: true, success: success, message: msg });

	useEffect(() => {
		if (tobeEditted)
			setFormData(tobeEditted);
		const getAllCountries = async () => {
			const { data } = await axiosDef.get(URL.countriesURL);
			if (!data.error)
				setCountries(data.data);
			else openAlert(false, data.data.msg);
		};
		getAllCountries();
	}, []);

	useEffect(() => {
		const getStates = async () => {
			const { data } = await axiosDef.post(URL.statesURL,
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
			const { data } = await axiosDef.post(URL.citiesURL,
				JSON.stringify({ country: country, state: state })
			);
			if (!data.error)
				setCities(data.data);
			else openAlert(false, data.data.msg);;
		};
		if (state)
			getCities();
	}, [state]);
	useEffect(() => {
		if (country && state && city) {
			setFormData({ ...formData, location: { country, state, city } });
		}
	}, [country, state, city]);

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		const fieldName = event.target.id;
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			null,
			(error) => {
				console.error(error);
				setFileError({ ...fileError, [fieldName]: true });
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log(downloadURL);
					setFileError({ ...fileError, [fieldName]: false });
					setFormData({ ...formData, [fieldName]: downloadURL });
				}
				);
			}
		);
	};

	const inValidInputs = () => {
		if (
			!formData.companyLogo ||
			!formData.companyName ||
			!formData.companyType ||
			!formData.description ||
			!formData.email ||
			!formData.location.city ||
			!formData.location.country ||
			!formData.telNumber.line ||
			!formData.website
		) {
			openAlert(false, "ooops There Empty Field in Form, All fields are Required !!");
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		if (!inValidInputs()) {
			try {
				const { data } = await axios.post('/api/companies', formData);
				// dispatch(createCompanySuccess(data));
				openAlert(true, "Company is Posted Successfully !!");
				clearFields();
			} catch (error) {
				console.error(error);
				const msg = error.response?.data?.message;
				// dispatch(createCompanyFailure(msg ? msg : error.message));
				openAlert(false, msg ? msg : error.message);
				// setAlert({ visible: true, success: false, message: "Sorry !! Posting the Company is Failed, Try Again Later !" });
			}
		}
	};

	return (
		<section className="w-full h-full overflow-auto shadow-md rounded-md max-w-5xl mx-auto p-5">
			{
				alert.visible ?
					<Alert
						returnFunction={closeAlert}
						message={alert.message}
						success={alert.success}
						style={{ width: "100%", marginTop: 100 }}
					/>
					:
					<form className="form" onSubmit={handleSubmit} >
						<div className="inputs-con w-full">
							<div className="label-input-con">
								<label htmlFor="companyType" className="label"> Company Type</label>
								<select
									className='input'
									id='companyType'
									parentid=""
									value={formData.companyType}
									onChange={handleChange}
								>
									{
										companyTypes.map(item => (<option key={item.label} value={item.value}>{item.label}</option>))
									}
								</select>
							</div>

							<div className="label-input-con">
								<label htmlFor="title" className="label"> Company Name</label>
								<input
									className='input'
									type='text'
									id='companyName'
									parentid=""
									placeholder='Company Name'
									value={formData.companyName}
									onChange={handleChange}
									required
									autoComplete='on'
								/>
							</div>

							<div className="label-input-con">
								<label htmlFor="website" className="label"> Web Address</label>
								<input
									className='input'
									type='url'
									id='website'
									parentid=""
									pattern='https://www.*'
									placeholder='https://www.*'
									value={formData.website}
									onChange={handleChange}
									required
									autoComplete='on'
								/>
							</div>

							<div className="label-input-con">
								<label htmlFor="email" className="label"> Company Email</label>
								<input
									className='input'
									type='email'
									id='email'
									parentid=""
									placeholder='Company Email'
									value={formData.email}
									onChange={handleChange}
									required
									autoComplete='on'
								/>
							</div>

							<div className="label-input-con">
								<p className="label">Company Address</p>
								<div className='gap-5 grid grid-cols-3'>
									<div>
										<label htmlFor="country" className="label">Country</label>
										<select
											className='input overflow-auto'
											id='country'
											parentid="location"
											// value={formData.location?.country}
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
											// value={formData.location?.state}
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
											// value={formData.location?.city}
											onChange={(event) => setCity(event.target.value)}
										>
											{/* <option value="">Select state</option> */}
											{cities.map(item => (<option key={item} value={item}>{item}</option>))}
										</select>
									</div>
								</div>
							</div>

							<div className="label-input-con">
								<p className="label">Telephone Number</p>
								<div className='flex gap-5'>
									<div>
										<label htmlFor="line" className="label">Line</label>
										<input
											className='input small--input'
											type='tel'
											id='line'
											parentid="telNumber"
											// pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
											placeholder='phone number'
											required
											value={formData.telNumber?.line}
											onChange={handleChange}
										/>
									</div>
									<div>
										<label htmlFor="mobile" className="mobile">Mobile</label>
										<input
											className='input small--input'
											type='tel'
											id='mobile'
											parentid="telNumber"
											placeholder='phone number'
											// pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
											value={formData.telNumber?.mobile}
											onChange={handleChange}
											autoCorrect='on'
										/>
									</div>
								</div>
							</div>

							<div className="label-input-con">
								{
									tobeEditted?.companyLogo ?
										<label htmlFor='companyLogo' className='flex items-center gap-5 cursor-pointer' >
											<img src={formData.companyLogo} alt='company logo' className='w-20 h-20 border rounded-full object-cover' />
											select one
											<input
												className='input'
												hidden
												type='file'
												accept='image/*'
												name='companyLogo'
												id='companyLogo'
												parentid=""
												onChange={handleChange}
											/>
										</label>
										:
										<>
											<label htmlFor="logo" className="label logo">
												Select Logo
												<span className='text-red-600 lowercase ml-2'>
													{fileError.companyLogo && "Cannot Upload the file at the moment"}
												</span>
											</label>
											<span className='input border flex items-center'>
												<input
													type='file'
													accept='image/*'
													name='companyLogo'
													id='companyLogo'
													parentid=""
													onChange={handleChange}
												// required
												/>
											</span>
										</>
								}
							</div>

							<div className="label-input-con">
								<label htmlFor="description" className="label">
									Company Description
									<span className='text-red-600 lowercase ml-2'>
										{fileError.description && "Cannot Upload the file at the moment"}
									</span>
								</label>
								<span className='input border flex items-center'>
									<input
										type='file'
										accept='application/pdf'
										name='description'
										id='description'
										parentid=""
										onChange={handleChange}
									// required
									/>
								</span>
							</div>

							<div className="label-input-con">
								<input
									className='input btn form-btn'
									type='submit'
									value={tobeEditted ? "Update Company" : "Add Company"}
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
		</section >
	);

}

export default AddCompany;