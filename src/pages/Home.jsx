import React from 'react'

function Home () {
  return (
    <div
      className='gridfullcol grid11row py-20 px-4 max-w-6xl mx-auto flex flex-col gap-4'
    >
      <h1 className='text-3xl font-bold  text-slate-800'>Jobify: Find Your Next Big Thing.</h1>
      <p className=' text-slate-700'>
        Tired of endless scrolling through irrelevant job listings? Jobify is here to make your job search faster, smarter, and more rewarding.
      </p>

      <h2 className='text-xl text-slate-700'>
        Why Choose Jobify?
      </h2>
      <ul className='ml-5 list-disc'>
        <li className=' text-slate-700'>
          Smart & Personalized Search: No more sifting through mountains of irrelevant jobs. Our advanced search filters and matching algorithms deliver personalized results tailored to your skills and experience.

        </li>
        <li className=' text-slate-700'>
          Diverse & Growing Opportunities: Discover a wide range of job opportunities across every industry and location, from entry-level positions to executive roles.
        </li>
        <li className=' text-slate-700'>
          Employer Insights & Transparency: Get a clear picture of the companies you're interested in. Explore detailed employer profiles, learn about their culture and benefits, and make informed decisions about your career path.
        </li>
        <li className=' text-slate-700'>
          Your Career Compass: Access resources and articles designed to help you land your next job, negotiate salaries, and level up your career skills.
        </li>
        <li className=' text-slate-700'>
          Focus on Career Growth: We offer career resources and articles to help you land your next job, negotiate salaries, and advance your career.
        </li>
      </ul>

      <p className=' text-xl text-slate-700'>
        Ready to Take Your Career to the Next Level?
      </p>
      <p className=' text-xl text-slate-700'>
        Start exploring opportunities now:
      </p>
      <p className=' text-xl text-slate-700'>
        Browse Jobs
      </p>

      <ul className='ml-5 list-disc'>
        <li className=' text-slate-700'>
          Create a Profile
        </li>
        <li className=' text-slate-700'>
          Find Companies
        </li>
        <li className=' text-slate-700'>
          A supportive community for career growth and development.
        </li>
      </ul>
      <p className=' text-xl text-slate-700'>
        <a href="/signup">Join the Jobify Community Today!</a>
      </p>





    </div >
  );
}

export default Home;