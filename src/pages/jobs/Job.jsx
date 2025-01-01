import { useState } from "react";
import { Alert, JobBtns, JobDetails } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteJob, updateJob, } from "../../@api/api/jobs_api";
import { LINK_TO } from "../../data/appData";

const Job = () => {
	const { targetJob: job, status, error } = useSelector(state => state.jobs);
	const [alert, setAlert] = useState({
		visible: false,
		success: false,
		message: ""
	});
	const closeAlert = () => setAlert({ ...alert, visible: false });
	const openAlert = (success, msg) => setAlert({ visible: true, success: success, message: msg });


	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDeleteJob = async () => {
		try {
			dispatch(deleteJob(job._id));
			const removalSuccessMsg = "Deleting Job Operation is successful";
			openAlert(true, removalSuccessMsg);
		} catch (error) {
			console.error(error);
			const msg = error.response?.data?.message ? error.response?.data?.message : error.message;
			openAlert(false, msg);
		}
	};

	const handleEdit = () => {
		navigate(LINK_TO.editJob, { state: { job, edit: true } });
	};

	const changeJobStatus = async () => {
		try {
			dispatch(updateJob({ ...job, status: job.status === "Active" ? "Closed" : "Active" }));
			const updateSuccessMsg = "Updating Job Operation is successful";
			openAlert(true, updateSuccessMsg);
		} catch (error) {
			console.error(error);
			const msg = error.response?.data?.message ? error.response?.data?.message : error.message;
			openAlert(false, msg);
		}
	};

	return (
		<section className='w-full h-full bg-slate-200 flex flex-col items-center gap-5'>
			{
				alert.visible ?
					<Alert
						success={alert.success}
						message={alert.message}
						returnFunction={closeAlert}
					/>
					:
					<div className='w-full h-full flex flex-col' >
						<JobDetails job={job} />
						<JobBtns
							handleEdit={handleEdit}
							handleDeleteJob={handleDeleteJob}
							changeJobStatus={changeJobStatus}
						/>
					</div>
			}
		</section>
	);
};

export default Job;