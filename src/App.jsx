import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { About, Home, Profile, SignIn, SignUp, AddCompany, AddJob, Unauthorized, Missing, SearchJobs, Company, } from './pages';
import { RequireAuth, AppHeader, JobDatails, } from './components';
import { ROLES } from './data/roles';
import CompanyPage from './pages/CompanyPage';
import UsersPage from './pages/UsersPage';
import { JobsPage } from './pages';
import { LINK_TO } from './data/appData';

export default function App() {
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

          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route path={LINK_TO.listJobs} element={<JobsPage />} />
            <Route path={LINK_TO.addJob} element={<AddJob />} />
            <Route path={LINK_TO.viewJob} element={<JobDatails />} />
            <Route path={LINK_TO.searchJob} element={<SearchJobs />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.super]} />}>
            <Route path={LINK_TO.listUsers} element={<UsersPage />} />
            <Route path={LINK_TO.addUser} element={<SignUp />} />
          </Route>

          <Route path='/*' element={<Missing />} />
        </Routes>

      </BrowserRouter>
    </section>
  );
}
