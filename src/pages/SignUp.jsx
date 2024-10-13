import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";

import OAuth from '../components/OAuth';
const NAME_REGEX = /^[a-z ]{2,24}$/i;
const TEL_NO_REGEX = /^0(9|7)[0-9]{8}$/i;
const PWD_REGEX = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

      console.log(formData);

      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

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
      setLoading(false);
      setError(error.message);
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
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Add User</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='First Name'
          className='border p-3 rounded-lg'
          id='firstName'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Last Name'
          className='border p-3 rounded-lg'
          id='lastName'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <div className='w-full relative'>
          <Eye showState={showPassword} elemId={"password"} />
          <input
            type='password'
            placeholder='Password'
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
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
