import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  deleteMeStart,
  deleteMeFailure,
  deleteMeSuccess,
} from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { signOutUserFailure, signOutUserSuccess } from '../redux/userSlice';
export default function Profile() {
  const fileRef = useRef(null);
  const { currUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/users/${currUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteMeStart());
      const res = await fetch(`/api/users/${currUser._id}`, {
        method: 'DELETE',
      });
      console.log(res)

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteMeFailure(data.message));
        return;
      }
      dispatch(deleteMeSuccess(data));
    } catch (error) {
      dispatch(deleteMeFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      if (res.status === 204) {
        dispatch(signOutUserSuccess());
        navigate('/signin');
        return;
      }
      dispatch(signOutUserFailure("didn't signed out"));
    } catch (error) {
      console.log(error);
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className='gridcentercol gridcenterrow p-3 flex flex-col gap-4 max-w-xl'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex gap-4 items-end'>
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
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
          />
          <div className='flex flex-col'>
            <label htmlFor='email' className=''>{currUser?.email}</label>
            <label htmlFor='firstName' className='font-bold'>{currUser?.firstName + " " + currUser?.lastName}</label>
          </div>
        </div>
        <div className='flex justify-between items-center mt-5'>
          <p className='text-sm self-start'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
            ) : ("")}
          </p>
          <span
            onClick={handleSignOut}
            className='text-blue-700 pt-1 pb-1 pl-4 pr-4 cursor-pointer hover:bg-blue-600 hover:text-white rounded-md ml-auto'
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
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
        <input
          type='password'
          placeholder='create new password'
          onChange={handleChange}
          id='new_password'
          className='border p-3 rounded-lg'
        />

        <input
          type='password'
          placeholder='confirm new password'
          onChange={handleChange}
          id='conf_password'
          className='border p-3 rounded-lg'
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 pt-1 pb-1 pl-3 pr-3 cursor-pointer hover:bg-red-600 hover:text-white rounded-md'
        >
          Delete account
        </span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
  );
}
