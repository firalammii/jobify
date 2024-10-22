import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { links as initial, LINK_TO } from '../data/appData';

export default function AppHeader () {
  const [links, setLinks] = useState(initial);
  const [title, setTitle] = useState('');

  const navigate = useNavigate();
  const { currUser, loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('title', title);
    const searchQuery = urlParams.toString();
    navigate(`/jobs/search?${searchQuery}`);
    // navigate(`/search`);
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
    <header className='gridfullcol w-full bg-slate-200 shadow-md mx-auto sticky top-0 z-50'>
      <div className='flex justify-between items-center p-3 pl-5 pr-5 '>
        <Link to={LINK_TO.home}>
          <h1 className='font-bold text-sm sm:text-xl flex gap-0.5 whitespace-nowrap capitalize'>
            <span className='text-slate-500'>jobify</span>
            <span className='text-slate-700'>job board</span>
          </h1>
        </Link>

        <div className='flex items-center justify-end gap-5 w-3/4'>

        <form
          onSubmit={handleSubmit}
            className='bg-slate-100 p-2 w-full max-w-md rounded-lg items-center hidden md:flex '
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
          <ul className='flex justify-end gap-2 align-middle items-center'>
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
          </ul>

          {currUser?.accessToken ? (
            <Link to={LINK_TO.userProfile}>
                <img
                  className='rounded-full h-7 w-7 object-cover'
                  src={currUser.avatar}
                  alt='profile'
              />
            </Link>
            ) : (
              <Link to={LINK_TO.signIn}>
                <li className=' text-slate-700 hover:underline'> Sign in</li>
              </Link>
          )}
        </div>
      </div>
    </header>
  );
}
