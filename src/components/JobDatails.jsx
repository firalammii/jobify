import React, { useEffect, useState } from 'react';
import '../css/overlay.scss';
import '../css/switch.css';
import { avatar } from '../data/formData';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LINK_TO } from '../data/appData';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { deleteJobFailure, deleteJobStart, deleteJobSuccess, updateJobFailure, updateJobStart, updateJobSuccess } from '../redux/jobSlice';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { jobURL } from '../api/urls';
import Alert from './Alert';

function JobDatails () {
	const [job, setJob] = useState({});
	const [alert, setAlert] = useState({ visible: false, success: false, message: "" });

	const dispatch = useDispatch();
	const axios = useAxiosPrivate();
	const navigate = useNavigate();
	const { state } = useLocation();
	const { company } = state;
	const url = `${jobURL}/${state?._id}`;

	const closeAlert = () => setAlert({ ...alert, visible: false });
	const openAlert = (success, msg) => setAlert({ visible: true, success: success, message: msg });

	const deleteJob = async () => {
		try {
			dispatch(deleteJobStart());
			const { data } = await axios.delete(url);
			const removalSuccessMsg = "Deleting Job Operation is successfull";
			openAlert(true, removalSuccessMsg);
			dispatch(deleteJobSuccess(data));
			setJob(data);
		} catch (error) {
			console.error(error);
			const msg = error.response?.data?.message ? error.response?.data?.message : error.message;
			openAlert(false, msg);
			dispatch(deleteJobFailure(msg));
		}
	};

	const handleEdit = async () => {
		navigate(LINK_TO.editJob, { state: job });
	};

	const changeJobStatus = async () => {
		try {
			dispatch(updateJobStart());
			const { data } = await axios.put(url, { status: job.status === "Active" ? "Closed" : "Active" });
			const updateSuccessMsg = "Updating Job Operation is successfull";
			openAlert(true, updateSuccessMsg);
			dispatch(updateJobSuccess(data));
			setJob(data);
		} catch (error) {
			console.error(error);
			const msg = error.response?.data?.message ? error.response?.data?.message : error.message;
			openAlert(false, msg);
			dispatch(updateJobFailure(msg));
		}
	};
	console.log(job);
	useEffect(() => {
		const getJob = async () => {
			try {
				const { data } = await axios.get(url);
				console.log(data);
				setJob(data);
			} catch (error) {
				console.error(error);
				setJob(state);
			}
		};
		if (state) {
			getJob();
		} else navigate(-1);
	}, []);


	return (
		<div className=' gridfullcol grid11row p-5 bg-slate-200 flex flex-col gap-5'>
			{
				alert.visible ?
					<Alert success={alert.success} message={alert.message} returnFunction={closeAlert} />
					:
					<div className='h-full flex flex-col'>
						<div
							className='flex gap-5  relative p-5 shadow-md rounded-ss-lg rounded-se-lg'
							style={{ height: 'calc(100% - 100px)' }}
						>
							<div className=' w-2/5 flex flex-col gap-5 overflow-auto'>
								<Link
									className='flex flex-col md:flex-row  w-full gap-5 items-center justify-center'
									to={LINK_TO.viewCompany} state={company} >
									<img
										className='rounded-full h-20 w-20 object-cover block'
										src={company?.companyLogo || avatar}
										alt='logo'
									/>
									<div>
										<p className='font-bold'>
											<span> {company?.companyName}</span>
											<span className='font-extralight'>( {company.companyType ? company.companyType : ""})</span>
										</p>
										<p className='font-ligtht'>{company?.website} </p>
										<p className='font-ligtht'>{company?.email} </p>
										<p className='font-extralight'> {company?.telNumber?.line}, {company?.telNumber?.mobile} </p>
									</div>
								</Link>

								<p className='font-medium'>About Company</p>
								<div className=' overflow-auto p-5 bg-white rounded-md'>
									<p className='text-justify rounded-xl'>{company?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas error quos assumenda sunt deleniti. dolor sit amet, consectetur adipisicing elit.</p>
									<p> Tenetur voluptate magni voluptatibus expedita a sit facilis aliquam maiores? Est voluptate saepe sint soluta? Temporibus non molestias aperiam rerum? Temporibus, nihil? Voluptate maxime est, quidem deserunt optio alias quasi dignissimos necessitatibus autem quis</p>
								</div>
							</div>

							<div className=' w-3/5 flex flex-col  shadow-sm gap-5 rounded-md overflow-y-auto'>
								<div className='md:grid md:grid-cols-2 gap-2 flex flex-col'>
									<p>Job Category: <span className='font-semibold' >{job?.jobCategory}</span></p>
									<p> Job Title: <span className='font-semibold'> {job?.title}</span> <span className='font-light lowercase'>({job?.jobType})</span></p>
									<p>Salary: <span className='font-semibold'>{job?.salary?.minSalary + " - " + job?.salary?.maxSalary}</span></p>
									<p>Experience: <span className='font-semibold'>{job?.experience?.minYears + " - " + job?.experience?.maxYears} Years</span></p>
									{
										job?.remoteOption !== "Remote"
											?
											<address >Location:
												<span className='font-semibold'>
													{job?.location?.city + ", " + job?.location?.job + ", " + job?.location?.country + ", " + job?.location?.zipCode}
												</span>
											</address>
											:
											<span className='font-light lowercase'>Location: {job?.remoteOption}</span>
									}
									<p>Posted Date: <span className='font-semibold'>{new Date(job?.postingDate).toLocaleDateString()} </span> </p>
									<p>Application Deadline: <span className='font-semibold'>{new Date(job?.applicationDeadline).toLocaleDateString()} </span> </p>
									<p>Recruitment Status: <span className='job-subtitle font-semibold'>{job?.status}</span></p>
									<span className='col-span-2'>apply to: <a className='underline font-light' href={job?.applyURL}>{job?.applyURL}</a></span>
								</div>

								<p className='font-medium'>Job Description</p>
								<div className='md:overflow-auto p-5 bg-white rounded-md '>
									<p className='text-justify rounded-xl'>{job?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, ratione, temporibus ut sequi consequuntur eveniet consectetur, voluptates similique sit voluptatum ipsam quasi quam dolore fugit delectus vitae eligendi distinctio libero iure. Minima sint dolores exercitationem aspernaturturi provident incidunt, at voluptate in eligendi. Quidem earum impedit maxime quisquam doloremque ratione, eum consectetur accusamus culpa nihil facere architecto. </p>
									<p className='text-justify rounded-xl'>{job?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, ratione, temporibus ut sequi consequuntur eveniet consectetur, voluptates similique sit voluptatum ipsam quasi quam dolore fugit delectus vitae eligendi distinctio libero iure. Minima sint dolores exercitationem aspernaturturi provident incidunt, at voluptate in eligendi. Quidem earum impedit maxime quisquam doloremque ratione, eum consectetur accusamus culpa nihil facere architecto. </p>
									<p className='text-justify rounded-xl'>{job?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, ratione, temporibus ut sequi consequuntur eveniet consectetur, voluptates similique sit voluptatum ipsam quasi quam dolore fugit delectus vitae eligendi distinctio libero iure. Minima sint dolores exercitationem aspernaturturi provident incidunt, at voluptate in eligendi. Quidem earum impedit maxime quisquam doloremque ratione, eum consectetur accusamus culpa nihil facere architecto. </p>
								</div>

							</div>
						</div>
						<div className='mt-auto h-24 p-6 flex justify-center items-center gap-5 shadow-md rounded-es-lg rounded-ee-lg overflow-auto'>
							<div className=' h-9 grid grid-cols-3 gap-5 md:w-1/2'>
								<Button onClick={handleEdit} label={"Edit Job"} style={{ backgroundColor: "blue", color: "white", borderRadius: "4px", minWidth: "min-content" }} />
								<Button onClick={changeJobStatus} label={"Change Status"} style={{ backgroundColor: "gray", color: "white", borderRadius: "4px", minWidth: "min-content" }} />
								<Button onClick={deleteJob} label={"Delete Job"} style={{ backgroundColor: "red", color: "white", borderRadius: "4px", minWidth: "min-content" }} />
							</div>
						</div>
					</div>
			}
		</div>
	);
}

export default JobDatails;