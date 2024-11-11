import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { About, Home, Profile, SignIn, SignUp, AddCompany, AddJob, Unauthorized, Missing, SearchJobs, Company, } from './pages';
import { RequireAuth, AppHeader, JobDatails, User, } from './components';
import { ROLES } from './data/roles';
import CompanyPage from './pages/CompanyPage';
import UsersPage from './pages/UsersPage';
import { JobsPage } from './pages';
import { LINK_TO } from './data/appData';
import { useEffect } from 'react';
import { fetchUsersFailure, fetchUsersStart, fetchUsersSuccess } from './redux/userSlice';
import axios from './api/axios';
import { useDispatch } from 'react-redux';
import { companyURL, jobURL, userURL } from './api/urls';
import { fetchCompaniesFailure, fetchCompaniesStart, fetchCompaniesSuccess } from './redux/companySlice';
import { fetchJobsFailure, fetchJobsStart, fetchJobsSuccess } from './redux/jobSlice';

export default function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    fetchUsers();
    fetchJobs();
    fetchCompanies();
  }, []);

  const fetchUsers = async (page, limit) => {
    dispatch(fetchUsersStart());
    const query = `?page=${page}&limit=${limit}`;
    //search
    try {
      const { data } = await axios.get(userURL + query);
      dispatch(fetchUsersSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(fetchUsersFailure(error.message || "Error While Fetching Users"));
    }
  };
  const fetchJobs = async (page, limit) => {
    dispatch(fetchJobsStart());
    const query = `?page=${page}&limit=${limit}`;
    //query add companyId
    try {
      const { data } = await axios.get(jobURL + query);
      dispatch(fetchJobsSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(fetchJobsFailure(error.message));
      // navigate({ from: location, replace: true });
    }
  };
  const fetchCompanies = async (page, limit) => {
    dispatch(fetchCompaniesStart());
    const query = `?page=${page}&limit=${limit}`;
    //search query
    try {
      const { data } = await axios.get(companyURL + query);
      dispatch(fetchCompaniesSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(fetchCompaniesFailure(error.message || "Error While Fetching Companies"));
      // navigate({ from: location, replace: true });
    }
  };

  return (
    <section className='App'>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path={LINK_TO.home} element={<Home />} />
          <Route path={LINK_TO.about} element={<About />} />
          <Route path={LINK_TO.signIn} element={<SignIn />} />
          <Route path={LINK_TO.unauthorized} element={<Unauthorized />} />
          <Route path={LINK_TO.userProfile} element={<Profile />} />

          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path={LINK_TO.listCompanies} element={<CompanyPage />} />
            <Route path={LINK_TO.addCompany} element={<AddCompany />} />
            <Route path={LINK_TO.editCompany} element={<AddCompany />} />
            <Route path={LINK_TO.viewCompany} element={<Company />} />
          </Route>

          {/* <Route path='jobs'> */}
          {/* <Route path='lists' element={<JobsPage />} /> */}
          <Route path='jobs' element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path={LINK_TO.listJobs} element={<JobsPage />} />
            <Route path={LINK_TO.addJob} element={<AddJob />} />
            <Route path={LINK_TO.editJob} element={<AddJob />} />
            <Route path={LINK_TO.viewJob} element={<JobDatails />} />
            <Route path={LINK_TO.searchJob} element={<SearchJobs />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.super]} />}>
            <Route path={LINK_TO.listUsers} element={<UsersPage />} />
            <Route path={LINK_TO.addUser} element={<SignUp />} />
            <Route path={LINK_TO.editUser} element={<User />} />
          </Route>

          <Route path='/*' element={<Missing />} />
        </Routes>

      </BrowserRouter>
    </section>
  );
}
