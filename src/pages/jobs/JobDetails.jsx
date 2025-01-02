import { Link } from 'react-router-dom';

import { avatar } from '../../data/formData';
import { LINK_TO } from '../../data/appData';

function JobDetails ({ job }) {

	return (
		<div
			className='w-full flex gap-5 relative p-5 shadow-md rounded-ss-lg rounded-se-lg'
			style={{ height: "calc(100vh - 128px)" }}
		>
			<div className=' w-2/5 flex flex-col gap-5 overflow-auto'>
				<Link
					className='flex flex-col md:flex-row  w-full gap-5 items-center justify-center'
					to={LINK_TO.viewCompany} state={job?.company} >
					<img
						className='rounded-full h-20 w-20 object-cover block'
						src={job?.company?.companyLogo || avatar}
						alt='logo'
					/>
					<div>
						<p className='font-bold'>
							<span> {job?.company?.companyName}</span>
							<span className='font-extralight'>( {job?.company?.companyType ? job.company.companyType : ""})</span>
						</p>
						<p className='font-light'>{job?.company?.website} </p>
						<p className='font-light'>{job?.company?.email} </p>
						<p className='font-extralight'> {job?.company?.telNumber?.line}, {job?.company?.telNumber?.mobile} </p>
					</div>
				</Link>

				<p className='font-medium'>About Company</p>
				<div className='h-full overflow-auto p-5 bg-white shadow-md rounded-md'>
					<p className='text-justify rounded-xl'>
						{job?.company?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas error quos assumenda sunt deleniti. dolor sit amet, consectetur adipisicing elit.</p>
				</div>
			</div>

			<div className=' w-3/5 h-full flex flex-col  shadow-sm gap-5 rounded-md overflow-auto'>
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
									&nbsp; {job?.location?.city + ", " + job?.location?.state + ", " + job?.location?.country}
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

				<p className='font-medium sticky top-1'>Job Description</p>
				<div className='h-full md:overflow-auto p-5 bg-white rounded-md'>
					<div className='text-justify rounded-xl flex flex-col gap-2 h-full overflow-auto'>
						{job?.description?.split('\n').map((para, index) => <p key={index}>{para}</p>)
						}
					</div>
				</div>
			</div>
		</div>

	);
}

export default JobDetails;