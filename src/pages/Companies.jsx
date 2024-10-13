import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import '../css/job-listing.scss';
import JobCard from '../components/JobCard.jsx';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { TableCompanies } from '../components';

const Companies = ({ editHandler }) => {
    const [companies, setCompanies] = useState([]);
    const [pages, setPages] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const dispatch = useDispatch();
    const axios = useAxiosPrivate();

    // const companies = useSelector(state => state.company.companies);

    // console.log(companies);



    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const { data } = await axios.get("/api/companies");
                setCompanies(data);
            } catch (error) {
                console.log(error);

            }
        };
        fetchCompanies();
    }, []);


    const handlePageSelection = async (pageNo, rpp) => {
        // setHasFetched(false);
        try {
            // const token = JSON.parse(sessionStorage.getItem("AasW2%fFH*ji$dwQ9c%ANaSBsW2%fFH*ji$dwQ89c%"))?.token;
            // const definedCondns = filterState.filter(fcondn => fcondn.selectedOption !== null
            //     && fcondn.selectedOption?.defined).map(definedCondn => definedCondn.selectedOption);
            // const page = pageNo > pages.length ? pages.length : pageNo;
            // const query = { limit: rpp ? rpp : rowsPerPage, page: page };

            // const { data } = await complexFilterCustomers(definedCondns, query, token);
            // dispatch({ type: FETCH_CUSTOMERS, payload: data.customers });
            // dispatch({ type: CUST_SUMMARY_DATA, payload: data.custSummaryData });
            // if (rpp) setRowsPerPage(rpp);
            // const npages = pages.map(npage =>
            //     npage.page === Number(page) ? { ...npage, isSelected: true } : { ...npage, isSelected: false }
            // );
            // setPages(npages);
            // setHasFetched(true);
        } catch (error) {
            // setHasFetched(false);
            return;
        }
    };


    return (
        <div className="Job-Listings">
            {/* <Filters /> */}

            <TableCompanies />
            {
                companies.map(company => (<JobCard key={company._id} data={company} editHandler={editHandler} companyOnly={true} />))
            }

        </div>
    );
};

export default Companies;