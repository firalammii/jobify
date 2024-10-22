import React, { useEffect, useState } from 'react';
import { jobCategories, remoteOptions } from '../data/formData';
import '../css/forms.scss';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Alert from './Alert';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsFailure, fetchJobsStart, fetchJobsSuccess, rowsPerPageChange } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const initial = {
	company: "",
	title: "",
	jobCategory: "",
	minSalary: "",
	maxSalary: "",
	location: "",
	jobType: "",
	remoteOption: "",
	minYears: "",
	maxYears: "",
	postingDate: "",
	createdAt: "",
	skills: [],
};

function Filters () {
	const [state, setState] = useState(initial);
	const [errMsg, setErrMsg] = useState("");

	const axios = useAxiosPrivate();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	console.log(state);

	const { currPage, rowsPerPage, } = useSelector(state => state.job);
	const { companies } = useSelector(state => state.company);

	const fetchJobs = async () => {
		dispatch(fetchJobsStart());
		dispatch(rowsPerPageChange(rowsPerPage));
		const query = `page=${currPage}&limit=${rowsPerPage}&company=${state.company}&jobCategory=${state.jobCategory}&remoteOption=${state.remoteOption}&createdAt=${state.createdAt}&postingDate=${state.postingDate}&title=${state.title}&minSalary=${state.minSalary}&maxSalary=${state.maxSalary}&minYears=${state.minYears}&maxYears=${state.maxYears}&location=${state.location}&skills=${state.skills}`;

		try {
			const response = await axios.get(`/api/jobs?${query}`);
			console.log("response: ", response);
			dispatch(fetchJobsSuccess(response.data));

		} catch (error) {
			setErrMsg(error?.data?.message);
			dispatch(fetchJobsFailure());
		}
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const titleFromUrl = urlParams.get('title');
		if (titleFromUrl)
			setState((prev) => ({ ...prev, title: titleFromUrl }));

		fetchJobs();
	}, [location.search]);

	useEffect(() => {

		fetchJobs();
	}, [state]);

	const handleChange = (e) => {
		setState({ ...state, [e.target.id]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchJobs();
	}

	return (
		<div
			className='grid3col grid11row  w-full p-3 bg-transparent shadow-md rounded-es-2xl'
		>
			<p className='font-bold'>Filter Criterions</p>
			<form className='inputs-con w-full h-full flex flex-col gap-2 p-5' onSubmit={handleSubmit} >
				<div className="label-input-con grid gap-2">
					<div>
						<label htmlFor="company" className="label "> By Company: </label>
						<select
							className='input h-10'
							id='company'
							value={state.company}
							onChange={handleChange}
						>
							<option value="">None</option>
							{
								companies.map(company => (<option key={company._id} value={company._id}>{company.companyName}</option>))
							}
						</select>
					</div>
				</div>
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
							placeholder='Min Years'
							value={state.minYears}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="maxYears" className="label">Max Years: </label>
						<input
							className='input small--input h-10'
							type='number'
							id='maxYears'
							placeholder='Max Years'
							value={state.maxYears}
							onChange={handleChange}
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
							value={state.minSalary}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="maxSalary" className="label">Max Salary: </label>
						<input
							className='input small--input h-10 w-24 '
							type='number'
							id='maxSalary'
							placeholder='Max Salary'
							value={state.maxSalary}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="label-input-con">
					<p className="label">Working Address/City</p>
					<label htmlFor="city" className="label">City: </label>
					<input
						className='input small--input h-10'
						type='text'
						id='location'
						placeholder='City'
						value={state.location}
						onChange={handleChange}
					/>
				</div>
				<div className="label-input-con">
					<div>
						<label htmlFor="createdAt" className="label"> Sort: </label>
						<select
							className='input h-10'
							id='createdAt'
							value={state.createdAt}
							onChange={handleChange}
						>
							<option value={-1} >newest</option>
							<option value={1} >oldest</option>
						</select>
					</div>
				</div>

				<div className="label-input-con flex gap-5">
					<input
						className='input form-btn cursor-pointer w-1/2 bg-gray-500 mt-3 py-2 px-4 font-semibold rounded-md text-white'
						type="button"
						value={"Clear Filters"}
						onClick={() => setState(initial)}
					/>
					<input
						className='input form-btn cursor-pointer  w-1/2 bg-blue-500 mt-3 py-2 px-4 font-semibold rounded-md text-white'
						type="submit"
						value={"Search"}
					/>
				</div>

			</form>
		</div>
	);
}

export default Filters;