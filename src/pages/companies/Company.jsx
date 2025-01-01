import { useRef, useState } from 'react';
import { IconButton, } from '../../components';
import { DeleteForever, Details, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LINK_TO } from '../../data/appData';
import { deleteCompany } from '../../@api/api/company_api';

function Company () {
	const seeJobs = useRef(null);
	const [showBtns, setShowBtns] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { state: company } = useLocation();

	const { rowsPerPage } = useSelector(state => state.jobs);

	const handleSeeJobs = async () => {
		seeJobs.current = !seeJobs.current;
		if (seeJobs) {
			const urlParams = new URLSearchParams(window.location.search);
			urlParams.set('company', company._id);
			// const searchQuery = urlParams.toString();
			const searchQuery = `page=${1}&limit=${rowsPerPage}` + urlParams.toString();
			// const query = `page=${1}&limit=${rowsPerPage}&company=${company._id}&createdAt=1`;
			try {
				// const { data } = await axios.get(`${URL.jobURL}?${searchQuery}`);
				// // console.log("response: ", response);
				// dispatch(fetchJobsSuccess(data));
				// navigate(`${LINK_TO.searchJob}/?${searchQuery}`, { state: { tableTitle: "Jobs by: " + company.companyName, companyId: company._id } })
			} catch (error) {
				console.error(error);
				// dispatch(fetchJobsFailure(error));
			}
		};
	};

	const handleEdit = async () => {
		navigate(LINK_TO.editCompany, { state: company });
	};

	const handleDeleteCompany = async () => {
		dispatch(deleteCompany(company._id));
	};

	return (
		<section className='flex h-full flex-col p-10 overflow-auto'>
			<div
				className='h-full flex justify-center items-center gap-5 relative '
				onMouseEnter={() => setShowBtns(true)}
				onMouseLeave={() => setShowBtns(false)}
			>
				<div className='h-full flex flex-col gap-5 p-5 ml-5 items-center shadow-md rounded-md'>
					<h2 className='my-5 text-xl  whitespace-nowrap'>Company Profile</h2>
					<div className='flex flex-col items-center gap-5  md:justify-center md:gap-10 overflow-auto'>
						<img src={company?.companyLogo} className=' w-24 h-24 rounded-full' />
						<div className='flex flex-col gap-1 items-center '>
							<p className='font-bold m-0'>
								{company?.companyName} <span className='font-light'>({company?.companyType})</span>
							</p>
							<address className='font-light text-center'>
								<p>{company?.website}</p>
								<p>{company?.telNumber?.line + ",  " + company?.telNumber?.mobile}</p>
								<p>
									{`${company?.location?.city} ${company?.location?.company ? ", " + company?.location?.company : ""}  ${", " + company?.location?.country} ${company?.location?.city ? ", " + company?.location?.zipCode : ""}`}
								</p>
							</address>
							<a href={company?.description} target="_blank">Read company description download pdf</a>
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

				<div className=' w-3/5 h-full pt-0  shadow-md p-5 rounded-md flex flex-col justify-center' >
					<h2 className='my-5 text-xl  whitespace-nowrap'>Company Description</h2>
					<div className='flex h-full flex-col gap-2  rounded-md overflow-auto'>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Esse, repellat? Error enim quasi quis. Id, sapiente cum quidem
							iusto culpa dolorum at in voluptatem fugit itaque animi blanditiis
							repudiandae delectus, molestiae impedit reiciendis fuga est nesciunt commodi!
							A sint enim, eaque molestiae facilis aperiam repellat pariatur provident eveniet esse nihil!
						</p>
					</div>
				</div>
			</div >
		</section>
	);
}

export default Company;