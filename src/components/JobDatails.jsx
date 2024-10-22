import React, { useState } from 'react';
import JobCard from './JobCard';
import '../css/overlay.scss';
import '../css/switch.css';
import { avatar } from '../data/formData';
import { Link, useLocation } from 'react-router-dom';
import { LINK_TO } from '../data/appData';
import Button from './Button';

function JobDatails () {
	const { state } = useLocation();
	const { company } = state;

	// console.log(state);

	return (
		<div className='gridfullcol grid11row'>
			<div className='shadow-md bg-slate-200 h-4/5 p-5 flex gap-5 rounded-xl overflow-hidden relative '>
				<div className=' w-2/5 flex flex-col gap-5 overflow-x-auto  shadow-md  rounded-xl'>
					<Link className='flex flex-col md:flex-row  w-full gap-5 items-center justify-center ' to={LINK_TO.viewCompany} state={company} >
						{/* <div > */}
						<img
							className='rounded-full h-20 w-20 object-cover block'
							src={company?.companyLogo || avatar}
							alt='logo'
						/>
						<div>
							<p className='font-bold'>
								<span> {company?.companyName}</span>
								<span className='font-extralight'>{` ( ${company?.companyType})`}</span>
							</p>
							<p className='font-ligtht'>{company?.website} </p>
							<p className='font-extralight'> {company?.telNumber?.line}, {company?.telNumber?.mobile} </p>
						</div>
						{/* </div> */}
					</Link>

					<p className='font-medium'>About Company</p>
					<div className='h-4/5 overflow-auto p-5 bg-white rounded-md'>
						<p className='text-justify rounded-xl'>{company?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas error quos assumenda sunt deleniti. dolor sit amet, consectetur adipisicing elit.</p>
						<p> Tenetur voluptate magni voluptatibus expedita a sit facilis aliquam maiores? Est voluptate saepe sint soluta? Temporibus non molestias aperiam rerum? Temporibus, nihil? Voluptate maxime est, quidem deserunt optio alias quasi dignissimos necessitatibus autem quis</p>
					</div>
				</div>

				<div className=' w-3/5 flex flex-col  shadow-sm gap-5 rounded-md overflow-x-auto'>

					<div className='  grid md:grid-cols-2 gap-2 whitespace-nowrap'>
						<div>
							<p>Job Category: <span className='font-semibold' >{state?.jobCategory}</span></p>
							<>
								<p className='job-title font-semibold'>{state?.title}</p>
								<span className='job-subtitle font-light lowercase'>({state?.jobType},</span>
								<span className='job-subtitle font-light lowercase'>{state?.remoteOption})</span>
							</>

							<p>Salary: <span className='job-subtitle font-semibold'>{state?.salary?.minSalary + " - " + state?.salary?.maxSalary}</span></p>
							<p>Experience: <span className='job-subtitle font-semibold'>{state?.experience?.minYears + " - " + state?.experience?.maxYears} Years</span></p>
						</div>
						<div>
							<address className='job-subtitle font-semibold'>{state?.location?.city + ", " + state?.location?.state + ", " + state?.location?.country + ", " + state?.location?.zipCode}</address>
							<p>post date: <span className='font-semibold'>{new Date(state?.postingDate).toLocaleDateString()} </span> </p>
							<p>dead line: <span className='font-semibold'>{new Date(state?.applicationDeadline).toLocaleDateString()} </span> </p>
							<p>apply to: <a className='underline font-light' href={state?.applyURL}>{state?.applyURL}</a></p>
							<p className='job-subtitle font-semibold'>{state?.status}</p>
						</div>
					</div>

						<p className='font-semibold'>Job Description</p>
					<div className=' h-3/5 overflow-auto p-5 bg-white rounded-md '>
						<p className='text-justify rounded-xl'>{state?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, ratione, temporibus ut sequi consequuntur eveniet consectetur, voluptates similique sit voluptatum ipsam quasi quam dolore fugit delectus vitae eligendi distinctio libero iure. Minima sint dolores exercitationem aspernaturturi provident incidunt, at voluptate in eligendi. Quidem earum impedit maxime quisquam doloremque ratione, eum consectetur accusamus culpa nihil facere architecto. </p>
						<p className='text-justify rounded-xl'>{state?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, ratione, temporibus ut sequi consequuntur eveniet consectetur, voluptates similique sit voluptatum ipsam quasi quam dolore fugit delectus vitae eligendi distinctio libero iure. Minima sint dolores exercitationem aspernaturturi provident incidunt, at voluptate in eligendi. Quidem earum impedit maxime quisquam doloremque ratione, eum consectetur accusamus culpa nihil facere architecto. </p>
					</div>
				</div>
			</div>

			<div className=' flex justify-center items-baseline gap-5 mt-5'>
				<Button label={"Edit Job"} style={{ backgroundColor: "blue", color: "white" }} />
				<Button label={"Close Post"} style={{ backgroundColor: "gray", color: "white" }} />
				<Button label={"Delete Job"} style={{ backgroundColor: "red", color: "white" }} />
			</div>
		</div>

	);
}

export default JobDatails;