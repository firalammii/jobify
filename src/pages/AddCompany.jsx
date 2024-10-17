import React, { useState, useEffect, useRef } from 'react';
import { FileOpenRounded } from "@mui/icons-material";
import { Alert } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { companyTypes, countries, } from '../data/formData';

import '../css/forms.scss';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

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

function AddCompany (props) {
	const inputRef = useRef("");
	const [state, setState] = useState(initial);
	const [door, setDoor] = useState("");
	const [alertMsg, setAlertMsg] = useState("");
	const [success, setSuccess] = useState(false);

	const dispatch = useDispatch();
	const axios = useAxiosPrivate();

	const tobeEditted = false;

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
		if (e.target.type === "file")
			setState({ ...state, [e.target.id]: e.target.files[0] });
		else
			setState({ ...state, [e.target.id]: e.target.value });
	};

	const handleObjectChange = (e) => {
		const fieldName = e.target.attributes.parentid.value;
		setState({ ...state, [fieldName]: { ...state[fieldName], [e.target.id]: e.target.value } });
	};

	const handleSubmit = async (e) => {
		const { companyType, companyLogo, email, companyName, location, website, telNumber, description, } = state;
		e.preventDefault();
		const validInputs = companyType && email && companyName && companyLogo && location && website && telNumber && description;
		if (!validInputs) {
			setAlertMsg("ooops There Empty Field in Form, All fields are Required !!");
			return;
		}
		setAlertMsg("");
		const formData = new FormData();
		formData.append("companyType", companyType);
		formData.append("companyName", companyName);
		formData.append("companyLogo", companyLogo);
		formData.append("location", location);
		formData.append("website", website);
		formData.append("telNumber", telNumber);
		formData.append("description", description);

		try {
			const response = await axios.post('/api/companies', formData, {
				headers: { 'Content-Type': 'application/json' },
			});
			console.log(response);

			setSuccess(true);
			setAlertMsg("company is Posted Successfully !!");
			clearFields();
		} catch (err) {
			console.log(err);
			setSuccess(false);
			setAlertMsg('Sorry !! Posting the Company is Failed, Try Again Later !');
		}
	};

	return (
		<div className="AddComp overflow-auto h-full">
			{
				alertMsg ?
					<Alert
						returnFunction={() => setAlertMsg("")}
						message={alertMsg}
						success={success}
					/>
					:
					<form className="form p-5" onSubmit={handleSubmit} >
						<div className="inputs-con">
							<div className="label-input-con">
								<label htmlFor="companyType" className="label"> Company Type</label>
								<select
									className='input'
									id='companyType'
									value={state.companyType}
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
									placeholder='Company Name'
									value={state.companyName}
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
									pattern='https://www.*'
									placeholder='https://www.*'
									// placeholder='Web Address'
									value={state.website}
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
									placeholder='Company Email'
									value={state.email}
									onChange={handleChange}
									required
									autoComplete='on'
								/>
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

							<div className="label-input-con">
								<p className="label">Telephone Number</p>
								<div className='flex gap-5'>
									<div>
										<label htmlFor="mobile" className="mobile">Mobile</label>
										<input
											className='input small--input'
											type='tel'
											id='mobile'
											placeholder='phone number'
											parentid="telNumber"
											pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
											value={state.telNumber?.mobile}
											onChange={handleObjectChange}
											required
											autoCorrect='on'
										/>
									</div>
									<div>
										<label htmlFor="line" className="label">Line</label>
										<input
											className='input small--input'
											type='tel'
											id='line'
											pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
											placeholder='phone number'
											parentid="telNumber"
											value={state.telNumber?.line}
											onChange={handleObjectChange}
										/>
									</div>
								</div>
							</div>

							<div className="label-input-con">
								<label htmlFor="logo" className="label logo"> Select Logo
									<div className='input logo'>
										<FileOpenRounded color='primary' fontSize='small' />
									</div>
								</label>
								<input
									className='input '
									type='file'
									name='companyLogo'
									id='companyLogo'
									value={state.companyLogo}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="label-input-con">
								<label htmlFor="description" className="label"> Company Description</label>
								<input
									className='input'
									type='file'
									name='description'
									id='description'
									value={state.description}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="label-input-con">
								<input
									className='input form-btn'
									type='submit'
									value={tobeEditted ? "Update Company" : "Add Company"}
								/>
							</div>

						</div>
					</form>
			}
		</div>
	);

}

export default AddCompany;