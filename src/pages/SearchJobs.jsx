import React, { useState } from 'react';
import { Filters } from '../components';
import Jobs from '../../../../Jobs';
import TableJobs from '../components/TableJobs';
import JobsPage from './Jobs';

function SearchJobs () {
	const [showFilters, setShowFilters] = useState(true);
	return (
		// <div
		// 	className='gridfull border flex'
		// >
		<>
			<div className='grid3col grid11row overflow-auto'>
				<Filters />
			</div>
			<div className='grid9col grid11row'>
				<JobsPage />
			</div>
		</>
		// </div>
	);
}

export default SearchJobs;