import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { About, CompanyPage, Home, JobsPage, Login, Missing, Register, UsersPage } from './pages';
import { Layout, RequireAuth } from './components';

import { LINK_TO } from './data/appData';
import { roles, ROLES } from './data/roles';
import { refresh } from './@api/api/auth_api';
import { useDispatch } from 'react-redux';
import AddJob from './pages/jobs/AddJob';
import User from './pages/users/User';


function App () {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('refresh');
    dispatch(refresh());
  }, []);
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={LINK_TO.home} element={<Home />} />
        <Route path={LINK_TO.addUser} element={<Register />} />
        <Route path={LINK_TO.signIn} element={<Login />} />
        <Route path={LINK_TO.about} element={<About />} />


        {/* <Route path={LINK_TO.unauthorized} element={<Unauthorized />} />
        <Route path={LINK_TO.userProfile} element={<Profile />} /> */}

        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path={LINK_TO.listCompanies} element={<CompanyPage />} />
          {/* <Route path={LINK_TO.addCompany} element={<AddCompany />} />
          <Route path={LINK_TO.editCompany} element={<AddCompany />} />
          <Route path={LINK_TO.viewCompany} element={<Company />} /> */}
        </Route>

        {/* <Route path='jobs'> */}
        {/* <Route path='lists' element={<JobsPage />} /> */}
        <Route path='jobs' element={<RequireAuth allowedRoles={roles} />}>
          <Route path={LINK_TO.listJobs} element={<JobsPage />} />
          <Route path={LINK_TO.addJob} element={<AddJob />} />
          <Route path={LINK_TO.editJob} element={<AddJob />} />
          {/* <Route path={LINK_TO.viewJob} element={<Job />} /> */}
          {/* <Route path={LINK_TO.searchJob} element={<SearchJobs />} /> */}
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.super]} />}>
          <Route path={LINK_TO.listUsers} element={<UsersPage />} />
          <Route path={LINK_TO.addUser} element={<Register />} />
          <Route path={LINK_TO.editUser} element={<User />} />
        </Route>

        <Route path='/*' element={<Missing />} />

        {/* <Route path='jobs' >
          <Route path='list' element={<RequireAuth allowedRoles={roles} children={<JobsPage />} />} />
        </Route> */}

      </Route>
    </Routes>
  );
}

export default App;
