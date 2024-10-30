import { useSelector } from 'react-redux';
import { useRef, useState, useEffect, } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, } from 'firebase/storage';

import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, signOutUserStart, deleteMeStart, deleteMeFailure, deleteMeSuccess, updateMeFailure, updateMeSuccess, updateMeStart, } from '../redux/userSlice';
import { signOutUserFailure, signOutUserSuccess } from '../redux/userSlice';
import { logInURL, logOutURL, userURL } from '../api/urls';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { LINK_TO } from '../data/appData';
const PWD_REGEX = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export default function Profile() {

  const fileRef = useRef(null);
  const { currUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);
  const [matchPassword, setMatchPassword] = useState(true);

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axios = useAxiosPrivate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    if (formData.oldPassword) {
      setValidPassword(PWD_REGEX.test(newPassword));
      setMatchPassword(newPassword === confirmPassword);
    }
  }, [newPassword, confirmPassword])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error)
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL)
          setFormData({ ...formData, avatar: downloadURL })
        }
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(updateMeStart());
      const { data } = await axios.put(`${userURL}/${currUser._id}`, JSON.stringify(formData));
      dispatch(updateMeSuccess(data));
      setUpdateSuccess(true);
      document.getElementById("profileform").reset();

    } catch (error) {
      dispatch(updateMeFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteMeStart());
      const { data } = await axios.delete(`${userURL}/${currUser._id}`);
      dispatch(deleteMeSuccess(data));
    } catch (error) {
      dispatch(deleteMeFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(logOutURL);
      if (res.status === 204) {
        dispatch(signOutUserSuccess());
        navigate(LINK_TO.signIn);
        return;
      }
      dispatch(signOutUserFailure("Log out Failed"));
    } catch (error) {
      console.error(error);
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <section className='gridfullcol grid11row w-full h-full p-10 pt-0 max-w-lg m-auto shadow-md rounded-md'>
      <form onSubmit={handleSubmit} id="profileform" className=' flex flex-col gap-4 overflow-auto'>
        <div className='text-center grid place-items-center gap-4'>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type='file'
            ref={fileRef}
            hidden
            accept='image/*'
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currUser?.avatar}
            alt='profile'
            className='rounded-full h-32 w-32 object-cover cursor-pointer self-center mt-10 mb-2 hover:scale-150 '
          />
          <p className='text-sm self-start'>
            {fileUploadError ? (
              <span className='text-red-700'>
                Error Image upload ({fileUploadError})
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700'>Image successfully uploaded!</span>
            ) : ("")}
          </p>
          <div className='flex flex-col'>
            <label htmlFor='firstName' className='font-bold'>{currUser?.firstName + " " + currUser?.lastName}</label>
            <label htmlFor='email' className=''>{currUser?.email}</label>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <span
            onClick={handleSignOut}
            className='bg-white text-blue-700 pt-1 pb-1 pl-4 pr-4 cursor-pointer hover:bg-blue-600 hover:text-white rounded-md ml-auto'
          >
            Sign Out
          </span>
        </div>
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
          type='password'
          placeholder='old password'
          id='password'
          onChange={handleChange}
          className='border p-3 rounded-lg'
        />
        <input
          type='password'
          placeholder='create new password'
          id='newPassword'
          onChange={handleChange}
          className={`'border p-3 rounded-lg' ${!validPassword ? 'border-red-600' : ''}`}
        />

        <input
          type='password'
          placeholder='confirm new password'
          id='confirmPassword'
          onChange={handleChange}
          className={`'border p-3 rounded-lg' ${!matchPassword ? 'border-red-600' : ''}`}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>

      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
            className='bg-black text-red-700 pt-1 pb-1 pl-3 pr-3 cursor-pointer hover:bg-red-600 hover:text-white rounded-md'
        >
          Delete account
        </span>
      </div>
        <p className={error ? 'text-red-700 mt-5' : 'text-green-700 mt-5'}>{updateSuccess ? 'User is updated successfully!' : error ? error.message : ''}</p>
      </form>
    </section>
  );
}
