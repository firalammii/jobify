import { useSelector } from 'react-redux';
import { useRef, useState, useEffect, } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, } from 'firebase/storage';

import { app } from '../firebase';
import { LINK_TO } from '../data/appData';
import { deleteProfile, signOut, updateProfile } from '../@api/api/auth_api';
import { API_STATUS } from '../@api/promiseStatus';
import { authSelector } from '../redux/authSlice';
const PWD_REGEX = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export default function Profile() {

  const fileRef = useRef(null);
  const { currentUser, status, error } = useSelector(authSelector);
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


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  useEffect(() => {
    if (!currentUser)
      navigate(LINK_TO.signIn);
  }, [currentUser]);

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
      dispatch(updateProfile({ id: currentUser._id, user: formData }));
      setUpdateSuccess(true);
      event.target.reset();

    } catch (error) {
      // dispatch(updateMeFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUser(currentUser._id));
      // dispatch(deleteMeStart());
      // const { data } = await axios.delete(`${URL.userURL}/${currentUser._id}`);
      // dispatch(deleteMeSuccess(data));
    } catch (error) {
      // dispatch(deleteMeFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOut());
      if (!currentUser)
        navigate(LINK_TO.signIn);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='w-full h-full p-10 pt-0 max-w-lg m-auto shadow-md rounded-md'>
      <form onSubmit={handleSubmit} className=' flex flex-col gap-1 overflow-auto'>
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
            src={formData.avatar || currentUser?.avatar}
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
            <label htmlFor='firstName' className='font-bold'>{currentUser?.firstName + " " + currentUser?.lastName}</label>
            <label htmlFor='email' className=''>{currentUser?.email}</label>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <button
            type='button'
            onClick={handleSignOut}
            className='bg-white text-blue-700 pt-1 pb-1 pl-4 pr-4 cursor-pointer hover:bg-blue-600 hover:text-white rounded-md ml-auto'
          >
            Sign Out
          </button>
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
          placeholder='Old password'
          id='password'
          onChange={handleChange}
          className='border p-3 rounded-lg'
        />
        <input
          type='password'
          placeholder='Create new password'
          id='newPassword'
          onChange={handleChange}
          className={`border p-3 rounded-lg ${!validPassword ? 'border-red-600' : ''}`}
        />

        <input
          type='password'
          placeholder='Confirm new password'
          id='confirmPassword'
          onChange={handleChange}
          className={`border p-3 rounded-lg ${!matchPassword ? 'border-red-600' : ''}`}
        />
        <button
          disabled={status === API_STATUS.loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {status === API_STATUS.loading ? 'Loading...' : 'Update'}
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
