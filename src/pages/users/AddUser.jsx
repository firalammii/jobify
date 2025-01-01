import { useState } from 'react';
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';

import { ROLES } from '../../data/roles';
import { Alert } from '../../components';
import { API_STATUS } from '../../@api/promiseStatus';
import { createUser } from '../../@api/api/users_api';
import { usersSelector } from '../../redux/userSlice';

export default function AddUser () {

  const [formData, setFormData] = useState({ roles: [] });
  const [showPassword, setShowPassword] = useState(false);
  const [superChecked, setSuperChecked] = useState(false);
  const [adminChecked, setAdminChecked] = useState(true);

  const [alertMsg, setAlertMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const { error, status } = useSelector(usersSelector);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      formData.roles = [];
      if (superChecked) formData.roles.push(ROLES.super);
      if (adminChecked) formData.roles.push(ROLES.admin);

      dispatch(createUser({ user: formData }));
      // const { data } = await axios.post(URL.userURL, JSON.stringify(formData));
      // dispatch(createUserSuccess(data));
      // console.log(data);
      setAlertMsg("Successfull Operation");
      setSuccess(true);
    } catch (error) {
      console.log(error);
      // dispatch(createUserFailure(error?.response?.data?.details?.length ? error.response.data.details[0]?.message[0] : error?.response?.data?.message));
      // setAlertMsg(error?.response?.data?.details?.length ? error.response.data.details[0]?.message[0] : error?.response?.data?.message);
      // setSuccess(false);
    }
  };

  const togglePwdShow = (id) => {
    const el = document.getElementById(id);
    el.type = el.type === "text" ? "password" : "text";
    setShowPassword(prev => !prev);

  };

  const Eye = ({ showState, elemId }) => {
    return (
      <div className="justify-self-end mr-3 grid place-items-center absolute top-4 right-3 rounded-full hover:cursor-pointer" onClick={() => togglePwdShow(elemId)} >
        {showState ?
          <VisibilityOffRounded fontSize="small" color='primary' />
          : <VisibilityRounded fontSize="small" color='primary' />
        }
      </div>
    );
  };

  return (
    <section className=' gridfullcol grid11row grid place-items-center'>
      {
        alertMsg ?
          <Alert message={alertMsg} success={success} returnFunction={() => setAlertMsg('')} />
          :
          <section className=' gridfullcol grid11row w-full h-full p-10 max-w-lg m-auto shadow-md rounded-md'>
            <h1 className='m-12 text-3xl text-center font-semibold'>Add User</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input
                type='text'
                placeholder='First Name'
                className='border p-3 rounded-md'
                id='firstName'
                required
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='Last Name'
                className='border p-3 rounded-md'
                id='lastName'
                required
                onChange={handleChange}
              />
              <input
                type='email'
                placeholder='Email'
                className='border p-3 rounded-md'
                id='email'
                required
                onChange={handleChange}
              />

              <div className='flex justify-between border p-3 rounded-md bg-white pr-10'>
                <span>Roles: </span>
                <div className='flex gap-3'>
                  <input
                    type='checkbox'
                    id='super'
                    name='roles'
                    checked={superChecked}
                    onChange={() => setSuperChecked(!superChecked)}
                  />
                  <label htmlFor="super">{ROLES.super}</label>
                </div>

                <div className='flex gap-3'>
                  <input
                    type='checkbox'
                    id='admin'
                    name='roles'
                    checked={adminChecked}
                    onChange={() => setAdminChecked(!adminChecked)}
                  />
                  <label htmlFor="admin">{ROLES.admin}</label>
                </div>
              </div>

              <div className='w-full relative'>
                <Eye showState={showPassword} elemId={"password"} />
                <input
                  type='password'
                  placeholder='Password OPTIONAL'
                  className='border p-3 rounded-md w-full'
                  id='password'
                  onChange={handleChange}
                />
              </div>

              <button
                disabled={status === API_STATUS.loading}
                className='bg-slate-700 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-80'
              >
                {status === API_STATUS.loading ? 'Loading...' : 'Add User'}
              </button>
            </form>
          </section>
      }
    </section>
  );
}
