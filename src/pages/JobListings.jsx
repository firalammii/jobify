import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import '../css/job-listing.scss';

import { JobCard, Filters, JobDatails } from '../components';
import JobsListingTable from '../components/TableJobs.jsx';
import { jobsTableHeads } from '../data/table-heads-data.js';
import { Navigate, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate.js';
import { fetchJobsStart, fetchJobsSuccess } from '../redux/jobSlice.js';


const JobListings = ({ editHandler }) => {
    const [pages, setPages] = useState([]);
    const [modalJob, setModalJob] = useState(null);

    const axios = useAxiosPrivate();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { jobs, totalJobs, currPage, rowsPerPage, totalPages, error, loading } = useSelector(state => state.job);


    function closeUserPage () {
        setModalJob(null);
    }
    function selectModalUser (job) {
        // navigate('/job-details')
        setModalJob(job);
    }

    useEffect(() => {
        const fetchJobs = async () => {
            dispatch(fetchJobsStart())
            try {
                const { data } = await axios.get(`/api/jobs/?${currPage}&${rowsPerPage}`);
                dispatch(fetchJobsSuccess(data));
            } catch (error) {
                console.log(error);

            }
        };
        fetchJobs();
    }, []);


    return (
        <div className="Job-Listings flex flex-row " style={{ height: "calc(100vh - 80px)" }}>
            <Filters />
            {/* <div>
            {
                jobs.map(job => (<JobCard key={job._id} data={job} editHandler={editHandler} />))
            }
            </div> */}
            <div className='w-full'>

                {
                    modalJob ?
                        <JobDatails job={modalJob} returnFunction={() => setModalJob(null)} />
                        :
                        loading ?
                            <CircularProgress />
                            :
                            !totalJobs ?
                                <p>No Match</p>
                                :
                                <JobsListingTable
                                    title={"JOBS LISTINGs"}
                                    tableHeads={jobsTableHeads}
                                    tableBody={jobs}
                                    rowsPerPage={rowsPerPage}
                                    totalPages={totalPages}
                                    currPage={currPage}
                                    totalJobs={totalJobs}
                                    selectModalUser={selectModalUser}
                                />
                }
            </div>
        </div>
    );
};

export default JobListings;