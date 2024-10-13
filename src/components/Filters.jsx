import React, { useState } from 'react';
import { jobCategories, remoteOptions } from '../data/formData';
import '../css/forms.scss';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Alert from './Alert';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsFailure, fetchJobsStart, fetchJobsSuccess } from '../redux/jobSlice';

const initial = {
	title: "",
	jobCategory: "",
	salary: { minSalary: "", maxSalary: "" },
	location: { city: "", },
	jobType: "",
	remoteOption: "",
	experience: { minYears: "", maxYears: "" },
	postingDate: "",
	skills: [],
};

function Filters () {
	const [state, setState] = useState(initial);
	const [errMsg, setErrMsg] = useState("");

	const axios = useAxiosPrivate();
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setState({ ...state, [e.target.id]: e.target.value });
	};
	const handleObjectChange = (e) => {
		const fieldName = e.target.attributes.parentid.value;
		setState({ ...state, [fieldName]: { ...state[fieldName], [e.target.id]: e.target.value } });
	};

	const { currPage, rowsPerPage, } = useSelector(state => state.jobObj);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(fetchJobsStart());

		const query = `page=${currPage}&limit=${rowsPerPage}&jobCategory=${state.jobCategory}&remoteOption=${state.remoteOption}&postingDate=${state.postingDate}&title=${state.title}&minSalary=${state.salary.minSalary}&maxSalary=${state.salary.maxSalary}&minYears=${state.experience.minYears}&maxYears=${state.experience.maxYears}&location=${state.location.city}&skills=${state.skills}`;

		try {

			const response = await axios.get(`/api/jobs?${query}`);

			console.log("response: ", response);
			dispatch(fetchJobsSuccess(response.data));

		} catch (error) {
			setErrMsg(error?.data?.message);
			dispatch(fetchJobsFailure());
		}

	}

	return (
		!errMsg ?
		<div className='w-1/3 h-full bg-transparent shadow-md rounded-es-2xl p-6 overflow-auto' >
			<h2 className='font-bold'>Filter Criterions</h2>
				<form className='inputs-con w-full grid gap-2' onSubmit={handleSubmit} >
				<div className="label-input-con grid gap-2">
					<div>
						<label htmlFor="jobCategory" className="label "> Job Category: </label>
						<select
							className='input h-10'
							id='jobCategory'
							value={state.jobCategory}
							onChange={handleChange}
						>
							{
								jobCategories.map(jobCat => (<option key={jobCat.label} value={jobCat.value}>{jobCat.label}</option>))
							}
						</select>
					</div>
				</div>

				<div className="label-input-con grid gap-2">
					<div>
						<label htmlFor="title" className="label"> Job Title: </label>
						<input
							className='input h-10'
							type='text'
							id='title'
							placeholder='Job Title'
							value={state.title}
								onChange={handleChange}
							autoComplete='on'
						/>
					</div>
				</div>

				<div className="label-input-con">
					<div>

						<label htmlFor="remoteOption" className="label"> Remote Option: </label>
						<select
							className='input h-10'
							id='remoteOption'
							value={state.remoteOption}
							onChange={handleChange}
						>
							{
								remoteOptions.map(remoteOption => (<option key={remoteOption.label} value={remoteOption.value}>{remoteOption.label}</option>))
							}
						</select>
					</div>
				</div>

				<div className="label-input-con">
					<div>
							<label htmlFor="postingDate" className="label"> Posting Date: </label>
						<input
							className='input h-10'
							type='date'
								id='postingDate'
							placeholder='Posting Date'
								value={state.postingDate}
								onChange={handleChange}
							autoComplete='on'
						/>
					</div>
				</div>

				<div className="label-input-con grid gap-2">
					<p className="label">Experience in Years </p>
					<div>
						<label htmlFor="minYears" className="label">Min Years: </label>
						<input
							className='input small--input h-10'
							type='number'
							id='minYears'
							parentid="experience"
							placeholder='Min Years'
							value={state.experience.minYears}
								onChange={handleObjectChange}
						/>
					</div>
					<div>
						<label htmlFor="maxYears" className="label">Max Years: </label>
						<input
							className='input small--input h-10'
							type='number'
							id='maxYears'
							parentid="experience"
							placeholder='Max Years'
							value={state.experience.maxYears}
								onChange={handleObjectChange}
						/>
					</div>
				</div>

				<p className="label">Salary Range Annually</p>
				<div className="label-input-con flex">
					<div >
						<label htmlFor="minSalary" className="label">Min Salary: </label>
						<input
							className='input small--input h-10 w-24'
							type='number'
							id='minSalary'
							placeholder='Min Salary'
							value={state.salary.minSalary}
							parentid="salary"
								onChange={handleObjectChange}
						/>
					</div>
					<div>
						<label htmlFor="maxSalary" className="label">Max Salary: </label>
						<input
							className='input small--input h-10 w-24 '
							type='number'
							id='maxSalary'
							placeholder='Max Salary'
							value={state.salary.maxSalary}
							parentid="salary"
								onChange={handleObjectChange}
						/>
					</div>
				</div>

				<div className="label-input-con">
					<p className="label">Working Address</p>
					<label htmlFor="city" className="label">City: </label>
					<input
						className='input small--input h-10'
						type='text'
						id='city'
						placeholder='City'
						value={state.location.city}
						parentid="location"
							onChange={handleObjectChange}
					/>
				</div>
				<div className="label-input-con">
					<input
							className='input form-btn cursor-pointer float-right w-1/2 bg-blue-500 mt-3 py-2 px-4 font-semibold rounded-md text-white'
						type="submit"
						value={"Search"}
					/>
				</div>

			</form>
		</div>
			:
			<Alert message={errMsg} success={false} returnFunction={() => setErrMsg("")} />
	);
}

export default Filters;