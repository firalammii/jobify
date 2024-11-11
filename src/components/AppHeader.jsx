import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { links as initial, LINK_TO } from '../data/appData';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { jobURL } from '../api/urls';
import { fetchJobsFailure, fetchJobsStart, fetchJobsSuccess } from '../redux/jobSlice';

export default function AppHeader () {
  const [links, setLinks] = useState(initial);
  const [title, setTitle] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axios = useAxiosPrivate();

  const { currUser, loading, error } = useSelector((state) => state.user);
  const { rowsPerPage } = useSelector((state) => state.job);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('title', title);
    const searchQuery = urlParams.toString();
    try {
      console.log(title);

      dispatch(fetchJobsStart());
      const { data } = await axios.get(`${jobURL}/?page=1&limit=${rowsPerPage}&title=${title}`);
      console.log(data);

      dispatch(fetchJobsSuccess(data));
    } catch (error) {
      dispatch(fetchJobsFailure());
    }
    navigate(`${LINK_TO.searchJob}/?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const titleFromUrl = urlParams.get('title');
    if (titleFromUrl) {
      setTitle(titleFromUrl);
    }
  }, [location.search]);

  const handleSelectPages = (label) => {
    setLinks(prevLinks => prevLinks.map(prevLink => prevLink.label === label ? { ...prevLink, active: true } : { ...prevLink, active: false }));
  }

  return (
    <header className='gridfullcol w-full p-2 flex justify-between items-center gap-5 bg-slate-200 shadow-md mx-auto sticky top-0 z-50'>
      <Link to={LINK_TO.home}>
        <h1 className='font-bold text-sm sm:text-xl flex gap-0.5 whitespace-nowrap capitalize'>
          <span className='text-slate-500'>jobify</span>
          <span className='text-slate-700'>job board</span>
        </h1>
      </Link>

      <div className='flex w-3/4 items-center justify-end gap-5 overflow-auto'>
        <form
          className='bg-slate-100 w-1/2 p-2 max-w-2xl rounded-lg items-center hidden md:flex'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-full '
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>

        <ul className=' flex justify-end gap-2 pr-2 items-center overflow-x-auto'>
          {
            links.map(link => {
              return (
                <Link key={link.label} to={link.to} onClick={() => handleSelectPages(link.label)}>
                  <li className={`text-slate-700 hover:underline capitalize ${link.label === 'Search' ? 'md:hidden' : ''} ${link.active ? 'font-bold' : ''}`}>
                    {link.label === "Search" ? <FaSearch className='text-slate-600' /> : link.label}
                  </li>
                </Link>
              );
            })

          }
          {currUser?.accessToken ? (
            <Link to={LINK_TO.userProfile}>
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currUser.avatar}
                alt=''
              />
            </Link>
          ) : (
            <Link to={LINK_TO.signIn}>
                <li className=' text-slate-700 hover:underline whitespace-nowrap'> Sign in</li>
              </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
