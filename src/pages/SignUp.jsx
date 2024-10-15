import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";

import OAuth from '../components/OAuth';
import { ROLES } from '../data/roles';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
const NAME_REGEX = /^[a-z ]{2,24}$/i;
const TEL_NO_REGEX = /^0(9|7)[0-9]{8}$/i;
const PWD_REGEX = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export default function SignUp() {
  const [formData, setFormData] = useState({ roles: [] });
  const [showPassword, setShowPassword] = useState(false);
  const [superChecked, setSuperChecked] = useState(false);
  const [adminChecked, setAdminChecked] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const axios = useAxiosPrivate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      formData.roles = [];
      if (superChecked) formData.roles.push(ROLES.super);
      if (adminChecked) formData.roles.push(ROLES.admin);

      const response = await axios.post('/api/users', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { data } = response;

      console.log(data);

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/signin');
    } catch (error) {
      console.log(error)
      setLoading(false);
      setError(error?.response?.data?.details?.length ? error.response.data.details[0]?.message[0] : error?.response?.data?.message);
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
    <div className='p-10 pb-40 max-w-xl mx-auto shadow-md rounded-lg'>
      <h1 className='text-3xl text-center font-semibold my-7'>Add User</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='First Name'
          className='border p-3 rounded-lg'
          id='firstName'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Last Name'
          className='border p-3 rounded-lg'
          id='lastName'
          required
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          required
          onChange={handleChange}
        />

        <div className='flex justify-between border p-3 rounded-lg bg-white pr-10'>
          <span>Decide the roles here: </span>
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
            className='border p-3 rounded-lg w-full'
            id='password'
            onChange={handleChange}
          />
        </div>

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Add User'}
        </button>
      </form>

      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
