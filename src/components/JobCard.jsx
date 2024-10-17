import React, { useState } from 'react';
// import '../css/job-card.scss';
import FloatingButtons from './IconButton';
import { BASE_URL } from '../apis/axios';

function JobCard ({ data, editHandler, companyOnly }) {
	const deleteHandler = () => {

	};
	return (
		<div className='Job-Card w-full overflow-auto'>
			<div className='subtitle w-full mb-4 grid grid-cols-3 h-1/3 overflow-auto'>
				<p>Job Category: <span >{data?.jobCategory}</span></p>
				<p>Job Title: <span className='job-title'>{data?.title}</span></p>
				<p>Type: <span className='job-subtitle'>{data?.jobType}</span></p>
				<p>Remote: <span className='job-subtitle'>{data?.remoteOption}</span></p>
				<p>required Skills: <span className='job-subtitle'>{data?.skills?.map((skill, i) => <span key={skill}>{i + 1 <= data?.skills.length ? `${skill}, ` : skill}</span>)}</span></p>
				<p>Status: <span className='job-subtitle'>{data?.status}</span></p>
				<p>apply url: <a className='job-subtitle underline' href={data?.applyURL}>{data?.applyURL}</a></p>
				<p>Address: <span className='job-subtitle'>{data?.location?.city + ", " + data?.location?.state + ", " + data?.location?.country + ", " + data?.location?.zipCode}</span></p>
				<p>salary: <span className='job-subtitle'>{data?.salary?.minSalary + " - " + data?.salary?.maxSalary}</span></p>
				<p>salary: <span className='job-subtitle'>{data?.salary?.minSalary + " - " + data?.salary?.maxSalary}</span></p>
				<p>post date: {new Date(data?.postingDate).toLocaleDateString()} </p>
				<p>due date: {new Date(data?.applicationDeadline).toLocaleDateString()}</p>
			</div>
			<div className='overflow-auto h-full'>
				<p className='font-medium'>Job Description</p>
				<p className='bg-white grid content-center gap-4 items-center rounded-xl'>{data?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, ratione, temporibus ut sequi consequuntur eveniet consectetur, voluptates similique sit voluptatum ipsam quasi quam dolore fugit delectus vitae eligendi distinctio libero iure. Minima sint dolores exercitationem aspernatur, cum repellendus beatae animi inventore corporis a architecto in nobis quasi voluptatem suscipit. A maxime totam obcaecati nihil quos eos aliquid doloribus. Laboriosam itaque quos, vero alias unde illo, a temporibus nisi modi sunt quia necessitatibus. Quisquam laboriosam error earum, sit numquam obcaecati excepturi provident incidunt, at voluptate in eligendi. Quidem earum impedit maxime quisquam doloremque ratione, eum consectetur accusamus culpa nihil facere architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, doloribus incidunt! Sint id voluptatibus est minima eum dicta soluta, enim tenetur impedit, tempora corrupti vel culpa nesciunt modi veniam ipsa. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis velit eveniet ab earum maiores eaque aliquid, error repellendus quibusdam magni ratione, reprehenderit asperiores impedit cupiditate nesciunt illo molestiae voluptatibus quae adipisci maxime? Id nisi debitis neque eum dicta quas velit fuga obcaecati ipsum, hic est sapiente unde perferendis dolorum cupiditate. Itaque sint saepe aliquid, eligendi magnam possimus dolores doloremque recusandae neque et laboriosam rem iusto fugit nesciunt ut animi assumenda fuga odio aspernatur. Tempore ad cupiditate unde doloribus saepe laudantium dolorum, commodi sunt tempora dicta! Nesciunt animi non laborum praesentium, soluta dicta veritatis rem corrupti suscipit dolor beatae, quibusdam excepturi!</p>
			</div>
		</div>

	);
}

export default JobCard;