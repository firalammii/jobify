import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signInStart, signInSuccess, signInFailure, } from '../redux/userSlice';
import axios from '../api/axios';
import { LINK_TO } from '../data/appData';
import { logInURL } from '../api/urls';

export default function SignIn() {
  const inputRef = useRef(null)
  const [formData, setFormData] = useState({});
  const { loading, error, } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || LINK_TO.home;

  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const { data } = await axios.post(logInURL, JSON.stringify(formData));
      dispatch(signInSuccess(data));
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      dispatch(signInFailure(error?.response?.data?.message));
    }
  };
  return (
    <div className='gridfullcol grid11row w-full rounded-lg shadow max-w-xl flex flex-col gap-5 m-auto p-10'>
      <h1 className='text-3xl text-center font-semibold my-5'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
          ref={inputRef}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
