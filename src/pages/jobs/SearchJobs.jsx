import { useState } from 'react';
import { Filters } from '../../components';
import JobsPage from './JobsPage';

function SearchJobs () {
	const [showFilters, setShowFilters] = useState(true);
	// const query = `/?q=page=${currPage}& limit=${rowsPerPage}& company=${state.company}& jobCategory=${state.jobCategory}& remoteOption=${state.remoteOption}& createdAt=${state.createdAt}& postingDate=${state.postingDate}& title=${state.title}& minSalary=${state.minSalary}& maxSalary=${state.maxSalary}& minYears=${state.minYears}& maxYears=${state.maxYears}& location=${state.location}& skills=${state.skills}`;
	return (
		<section className='w-full h-full flex flex-col md:flex-row overflow-auto'>
			<div className=' h-full w-full md:w-1/3 md:border-r-2 '>
				<Filters />
			</div>
			<div className='w-full h-full '>
				<JobsPage />
				{/* jobs */}
			</div>
		</section>
	);
}

export default SearchJobs;