import React, { useState } from 'react';
import { JobsListingTable } from '../components';
import { jobsTableHeads } from '../data/table-heads-data';

function Company ({ data, back }) {
	const [modal, setModal] = useState(null);

	const selectModal = (modalItem) => {
		setModal(modalItem);
	};

	return (
		<section className='flex flex-col gap-1 p-3' onClick={back}>
			<div className='flex gap-3'>
				<img src={data?.companyLogo} className='w-24 h-24 rounded-full' />
				<div className='flex flex-col gap-1 '>
					<p className='font-bold'>
						{data?.companyName} <span className='font-light'>({data.companyType})</span>
					</p>
				<address className='font-light'>
						<p>{data.website}</p>
						<p>{data.telNumber?.line + ",  " + data.telNumber?.mobile}</p>
						<p>
							{`${data.location?.city} ${data?.location?.state ? ", " + data.location?.state : ""}  ${", " + data.location?.country} ${data?.location?.city ? ", " + data?.location?.zipCode : ""}`}
						</p>
				</address>
					<a href={data.description}>Red company description download pdf</a>
				</div>
			</div>

			{/* <div>
				{
					modal ?
						<JobDetails job={modal} returnFunction={() => selectModal(null)} />
						:
						<JobsListingTable currPage={currPage} totalJobs={data?.jobs?.length} totalPages={totalPages} tableHeads={jobsTableHeads} tableBody={data?.jobs} selectModalUser={selectModal} />
				}
			</div> */}


		</section>
	);
}

export default Company;