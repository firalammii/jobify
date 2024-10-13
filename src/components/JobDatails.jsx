import React, { useState } from 'react';
import JobCard from './JobCard';
import '../css/overlay.scss';
import '../css/switch.css';
import { avatar } from '../data/formData';

function JobDatails ({ job, returnFunction }) {
	const [state, setState] = useState('');
	const [editMode, setMode] = useState(false);
	const { company } = job;

	const handleSwitch = (e) => {
		setMode(prev => !prev);
	}

	return (
		<div className='overlay' onClick={returnFunction}>
			<div className='shadow-md bg-slate-200 w-4/5 h-3/4 p-5 flex gap-5 rounded-xl overflow-hidden relative' onClick={(e) => e.stopPropagation()}>
				<div className='w-2/5 flex-col items-center justify-center shadow-sm gap-4 rounded-xl'>
					<div className='flex w-full h-1/5 gap-3 items-center justify-center'>
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
					</div>
					<div className='h-3/5 overflow-auto p-5 bg-white rounded-md'>
						<p className='font-medium'>About Company</p>
						<p className='text-justify rounded-xl'>{company?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas error quos assumenda sunt deleniti. dolor sit amet, consectetur adipisicing elit. Tenetur voluptate magni voluptatibus expedita a sit facilis aliquam maiores? Est voluptate saepe sint soluta? Temporibus non molestias aperiam rerum? Temporibus, nihil? Voluptate maxime est, quidem deserunt optio alias quasi dignissimos necessitatibus autem quis</p>
					</div>
				</div>

				<div className='w-3/5 flex-col items-center justify-center shadow-sm gap-4 rounded-md '>
					<div className='subtitle h-2/5 grid grid-cols-2 gap-2 whitespace-nowrap'>
						<div>
							<p>Job Category: <span className='font-semibold' >{job?.jobCategory}</span></p>
							<>
								<p className='job-title font-semibold'>{job?.title}</p>
								<span className='job-subtitle font-light lowercase'>({job?.jobType},</span>
								<span className='job-subtitle font-light lowercase'>{job?.remoteOption})</span>
							</>
							<div className='grid grid-cols-3'>required Skills: <span className='job-subtitle font-semibold	'>{job?.skills?.map((skill, i) => <span key={skill}>{i + 1 <= job?.skills.length ? `${skill}, ` : skill}</span>)}</span></div>
							<p>Salary: <span className='job-subtitle font-semibold'>{job?.salary?.minSalary + " - " + job?.salary?.maxSalary}</span></p>
							<p>Experience: <span className='job-subtitle font-semibold'>{job?.experience?.minYears + " - " + job?.experience?.maxYears} Years</span></p>
						</div>
						<div>
							<address className='job-subtitle font-semibold'>{job?.location?.city + ", " + job?.location?.state + ", " + job?.location?.country + ", " + job?.location?.zipCode}</address>
							<p>post date: <span className='font-semibold'>{new Date(job?.postingDate).toLocaleDateString()} </span> </p>
							<p>dead line: <span className='font-semibold'>{new Date(job?.applicationDeadline).toLocaleDateString()} </span> </p>
							<p>apply to: <a className='underline font-light' href={job?.applyURL}>{job?.applyURL}</a></p>
							<p className='job-subtitle font-semibold'>{job?.status}</p>
						</div>
					</div>

					<div className='h-3/5 overflow-auto p-5 bg-white rounded-md '>
						<p className='font-semibold'>Job Description</p>
						<p className='text-justify rounded-xl'>{job?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, ratione, temporibus ut sequi consequuntur eveniet consectetur, voluptates similique sit voluptatum ipsam quasi quam dolore fugit delectus vitae eligendi distinctio libero iure. Minima sint dolores exercitationem aspernaturturi provident incidunt, at voluptate in eligendi. Quidem earum impedit maxime quisquam doloremque ratione, eum consectetur accusamus culpa nihil facere architecto. </p>
					</div>
				</div>

			{/* <div className='absolute top-2 right-10' >
				<label className="switch text-white">
					<input type="checkbox" checked={editMode} onChange={handleSwitch} />
					<span className="slider round"></span>
				</label>
			</div> */}
			</div>
		</div>

	);
}

export default JobDatails;