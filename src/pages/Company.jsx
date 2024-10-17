import React, { useState } from 'react';
import { IconButton, } from '../components';
import { DeleteForever, Details, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { deleteCompanyFailure, deleteCompanyStart, deleteCompanySuccess, updateCompanyFailure, updateCompanyStart, updateCompanySuccess } from '../redux/companySlice';
import { Link, useNavigate } from 'react-router-dom';

const url = "/api/companies";

function Company ({ data, back }) {
	const [modal, setModal] = useState(null);
	const [showBtns, setShowBtns] = useState(null);

	const selectModal = (modalItem) => {
		setModal(modalItem);
	};
	const handleShowBtns = () => {
		setShowBtns(!showBtns);
	};

	const { companies } = useSelector(state => state.company);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const axios = useAxiosPrivate();

	const handleEdit = async () => {
		navigate({ pathname: "/add-company", state: data });
	};
	const seeJobs = async () => {
		navigate({ pathname: "/jobs", state: data });
	};

	const handleDeleteCompany = async () => {
		dispatch(deleteCompanyStart());
		try {
			const { data } = await axios.delete(url);
			dispatch(deleteCompanySuccess(data));
		} catch (error) {
			dispatch(deleteCompanyFailure(error));
		}
		back();
	};

	return (
		<section
			className='flex flex-col gap-1 p-4 pl-12 shadow-md rounded-md bg-white m-3 relative'
			onClick={back}
			onMouseEnter={() => setShowBtns(true)}
			onMouseLeave={() => setShowBtns(false)}
		>
			<div className='flex gap-5 items-center '>
				<div className='flex flex-col gap-1 p-2 justify-center items-center shadow-sm rounded-md'>

					<p className='m-0 pb-1 whitespace-nowrap'>Company Profile</p>

					<div className='flex flex-col items-center gap-1 md:flex-row  md:justify-center md:gap-10 '>
						<img src={data?.companyLogo} className='w-24 h-24 rounded-full' />
						<div className='flex flex-col gap-1 '>
							<p className='font-bold m-0'>
								{data?.companyName} <span className='font-light'>({data.companyType})</span>
							</p>
							<address className='font-light '>
								<p>{data.website}</p>
								<p>{data.telNumber?.line + ",  " + data.telNumber?.mobile}</p>
								<p>
									{`${data.location?.city} ${data?.location?.state ? ", " + data.location?.state : ""}  ${", " + data.location?.country} ${data?.location?.city ? ", " + data?.location?.zipCode : ""}`}
								</p>
							</address>
							<a href={data.description}>Red company description download pdf</a>
						</div>
					</div>

				</div>
				{
					showBtns &&
					<div className='grid gap-1 absolute right-12 bottom-6'>
						<IconButton Icon={<Details color='secondary' fontSize='large' />} onClick={seeJobs} />
						{/* <Link to={{ pathname: "/users", search: data }}><IconButton Icon={<Edit color='primary' fontSize='large' />} /></Link> */}
						<IconButton Icon={<Edit color='primary' fontSize='large' />} onClick={handleEdit} />
						<IconButton Icon={<DeleteForever color='error' fontSize='large' />} />
					</div>
				}

				<div className='w-1/2 p-4 pt-0  shadow-sm rounded-md  '>
					<p className='m-0 pb-1 '>Company Description</p>
					<div className=' h-48 flex flex-col gap-2  rounded-md overflow-auto md:h-36'>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Esse, repellat? Error enim quasi quis. Id, sapiente cum quidem
							iusto culpa dolorum at in voluptatem fugit itaque animi blanditiis
							repudiandae delectus, molestiae impedit reiciendis fuga est nesciunt commodi!
							A sint enim, eaque molestiae facilis aperiam repellat pariatur provident eveniet esse nihil!
						</p>
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