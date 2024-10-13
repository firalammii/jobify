import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { About, Home, Profile, SignIn, SignUp, Companies, AddCompany, Jobs, AddJob, Users, Unauthorized, Missing, } from './pages';
import { RequireAuth, AppHeader, JobDatails } from './components';
import { ROLES } from './data/roles';

export default function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/about' element={<About />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path='/profile' element={<Profile />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route path='/companies' element={<Companies />} />
          <Route path='/add-company' element={<AddCompany />} />

          <Route path="/jobs" element={<Jobs />} />
          <Route path="/add-job" element={<AddJob />} />
          {/* <Route path="/job-details" element={<JobDatails />} /> */}

        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.super]} />}>
          <Route path="/users" element={<Users />} />
          {/* <Route path="/add-user" element={<Register />} /> */}
          <Route path="/add-user" element={<SignUp />} />
          <Route path='/signup' element={<SignUp />} />

        </Route>
        <Route path='/*' element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}
