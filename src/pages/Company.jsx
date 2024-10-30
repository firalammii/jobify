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
				const { data } = await axios.get(`${jobURL}?${query}`);
				// console.log("response: ", response);
				dispatch(fetchJobsSuccess(data));
			} catch (error) {
				console.error(error);
				dispatch(fetchJobsFailure(error));
			}
		};
	};

	const handleEdit = async () => {
		navigate(LINK_TO.editCompany, { state });
	}

	const handleDeleteCompany = async () => {
		dispatch(deleteCompanyStart());
		try {
			const { data } = await axios.delete(`${companyURL}/${state._id}`);
			dispatch(deleteCompanySuccess(data));
		} catch (error) {
			dispatch(deleteCompanyFailure(error));
		}
	};

	return (
		<section className='gridfullcol grid11row flex flex-col gap-5'>
			<div
				className=' h-full flex justify-center gap-5 relative shadow-md rounded-md p-10'
				onMouseEnter={() => setShowBtns(true)}
				onMouseLeave={() => setShowBtns(false)}
			>

				<div className=' flex flex-col gap-5 p-5 items-center shadow-md rounded-md'>
					<p className='m-0 pb-1 whitespace-nowrap'>Company Profile</p>
					<div className='flex flex-col items-center gap-5  md:justify-center md:gap-10 overflow-auto'>
						<img src={state?.companyLogo} className=' w-24 h-24 rounded-full' />
						<div className='flex flex-col gap-1 items-center '>
							<p className='font-bold m-0'>
								{state?.companyName} <span className='font-light'>({state?.companyType})</span>
							</p>
							<address className='font-light text-center'>
								<p>{state?.website}</p>
								<p>{state?.telNumber?.line + ",  " + state?.telNumber?.mobile}</p>
								<p>
									{`${state?.location?.city} ${state?.location?.state ? ", " + state?.location?.state : ""}  ${", " + state?.location?.country} ${state?.location?.city ? ", " + state?.location?.zipCode : ""}`}
								</p>
							</address>
							<a href={state?.description} target="_blank">Read company description download pdf</a>
						</div>
					</div>
				</div>

				<>
				{
					showBtns &&
						<div className='grid gap-1 absolute right-7 bottom-12'>
							<IconButton Icon={<Details color='secondary' fontSize='large' />} onClick={handleSeeJobs} />
							<IconButton Icon={<Edit color='primary' fontSize='large' />} onClick={handleEdit} />
								<IconButton Icon={<DeleteForever color='error' fontSize='large' />} onClick={handleDeleteCompany} />
					</div>
				}
				</>

				<div className=' w-3/5 h-full pt-0  shadow-md p-5 rounded-md flex flex-col justify-center'>
					<p className='m-0 pb-2'>Company Description</p>
					<div className='flex h-4/5 flex-col gap-2  rounded-md overflow-auto'>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Esse, repellat? Error enim quasi quis. Id, sapiente cum quidem
							iusto culpa dolorum at in voluptatem fugit itaque animi blanditiis
							repudiandae delectus, molestiae impedit reiciendis fuga est nesciunt commodi!
							A sint enim, eaque molestiae facilis aperiam repellat pariatur provident eveniet esse nihil!
						</p>

					</div>
				</div>
			</div>
		</section>
	);
}

export default Company;