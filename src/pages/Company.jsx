import React, { useRef, useState } from 'react';
import { IconButton, } from '../components';
import { DeleteForever, Details, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { deleteCompanyFailure, deleteCompanyStart, deleteCompanySuccess, } from '../redux/companySlice';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/overlay.scss';
import { fetchJobsFailure, fetchJobsSuccess } from '../redux/jobSlice';
import { LINK_TO } from '../data/appData';
import { JobsPage } from '.';
import { companyURL, jobURL } from '../api/urls';

function Company () {
	const seeJobs = useRef(null);
	const [showBtns, setShowBtns] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const axios = useAxiosPrivate();
	const { state } = useLocation();

	const { rowsPerPage } = useSelector(state => state.job);

	const handleSeeJobs = async () => {
		seeJobs.current = !seeJobs.current;
		if (seeJobs) {
			const query = `page=${1}&limit=${rowsPerPage}&company=${state._id}&createdAt=1`;
			try {
				const response = await axios.get(`${jobURL}?${query}`);
				console.log("response: ", response);
				dispatch(fetchJobsSuccess(response.data));
			} catch (error) {
				console.error(error);
				dispatch(fetchJobsFailure());
			}
		};
	};

	const handleEdit = async () => {
		navigate(LINK_TO.editJob, { state });
	}

	const handleDeleteCompany = async () => {
		dispatch(deleteCompanyStart());
		try {
			const { data } = await axios.delete(companyURL + "/" + state._id);
			dispatch(deleteCompanySuccess(data));
		} catch (error) {
			dispatch(deleteCompanyFailure(error));
		}
	};

	return (
		<section className='gridfullcol grid11row flex flex-col gap-1 p-4 pl-12 shadow-md rounded-md bg-white m-3 overflow-auto'>
			<div
				className='flex gap-5 items-center relative'
				onMouseEnter={() => setShowBtns(true)}
				onMouseLeave={() => setShowBtns(false)}
			>

				<div className='flex flex-col gap-1 p-2 justify-center items-center shadow-sm rounded-md'>
					<p className='m-0 pb-1 whitespace-nowrap'>Company Profile</p>
					<div className='flex flex-col items-center gap-1 md:flex-row  md:justify-center md:gap-10 '>
						<img src={state?.companyLogo} className='w-24 h-24 rounded-full' />
						<div className='flex flex-col gap-1 '>
							<p className='font-bold m-0'>
								{state?.companyName} <span className='font-light'>({state?.companyType})</span>
							</p>
							<address className='font-light '>
								<p>{state?.website}</p>
								<p>{state?.telNumber?.line + ",  " + state?.telNumber?.mobile}</p>
								<p>
									{`${state?.location?.city} ${state?.location?.state ? ", " + state?.location?.state : ""}  ${", " + state?.location?.country} ${state?.location?.city ? ", " + state?.location?.zipCode : ""}`}
								</p>
							</address>
							<a href={state?.description}>Red company description download pdf</a>
						</div>
					</div>
				</div>

				<>
				{
					showBtns &&
						<div className='grid gap-1 absolute right-12 bottom-3'>
							<IconButton Icon={<Details color='secondary' fontSize='large' />} onClick={handleSeeJobs} />
							<IconButton Icon={<Edit color='primary' fontSize='large' />} onClick={handleEdit} />
								<IconButton Icon={<DeleteForever color='error' fontSize='large' />} onClick={handleDeleteCompany} />
					</div>
				}
				</>

				<div className='w-1/2 p-4 pt-0  shadow-sm rounded-md  '>
					<p className='m-0 pb-1 '>Company Description</p>
					<div className=' h-48 flex flex-col gap-2  rounded-md overflow-auto md:h-36'>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Esse, repellat? Error enim quasi quis. Id, sapiente cum quidem
							iusto culpa dolorum at in voluptatem fugit itaque animi blanditiis
							repudiandae delectus, molestiae impedit reiciendis fuga est nesciunt commodi!
							A sint enim, eaque molestiae facilis aperiam repellat pariatur provident eveniet esse nihil!
						</p>
						<p>Lorem ipsum dolor sit amet consectetur 					adipisicing elit.
							Esse, repellat? Error enim quasi quis. Id, sapiente cum quidem
							iusto culpa dolorum at in voluptatem fugit itaque animi blanditiis
							repudiandae delectus, molestiae impedit reiciendis fuga est nesciunt commodi!
							A sint enim, eaque molestiae facilis aperiam repellat pariatur provident eveniet esse nihil!
						</p>
					</div>
				</div>

			</div>

			<div className={`${seeJobs.current ? '' : 'mx-auto mt-5'}`}>
				{
					seeJobs.current ?
						<JobsPage />
						:
						<p>This company's job posts will appear here</p>
				}
			</div>
		</section>
	);
}

export default Company;