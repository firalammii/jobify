import React, { useState } from 'react';
import { JobsListingTable } from '../components';
import { jobsTableHeads } from '../data/table-heads-data';

function Company ({ data }) {
	const [modal, setModal] = useState(null);

	const selectModal = (modalItem) => {
		setModal(modalItem);
	};

	return (
		<section className='flex flex-col gap-1'>
			<div className='flex flex-col gap-1'>
				<img src={data?.companyLogo} />
				<p className='font-bold'>{data?.comapanyName} <span className='font-light'>({data.companyType})</span> </p>

				<address className='font-light'>
					<span>{data.website}</span>
					<span>{data.telNumber}</span>
					<span>
						{`${data.location?.city} ${data?.location?.state ? ", " + data.location?.state : ""}  ${", " + data.location?.country} ${data?.location?.city ? ", " + data?.location?.zipCode : ""} }`}
					</span>
				</address>
				<a href={data.description}>Red company description</a>
			</div>

			<div>
				{
					modal ?
						<JobDetails job={modal} returnFunction={() => selectModal(null)} />
						:
						<JobsListingTable currPage={currPage} totalJobs={data?.jobs?.length} totalPages={totalPages} tableHeads={jobsTableHeads} tableBody={data?.jobs} selectModalUser={selectModal} />
				}
			</div>


		</section>
	);
}

export default Company;