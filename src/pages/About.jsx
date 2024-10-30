import React from 'react'

export default function About() {
  return (
    <div
      className='gridfullcol grid11row py-20 px-4 max-w-6xl mx-auto flex flex-col gap-4 overflow-auto'
    >
      <h1 className='text-3xl font-bold  text-slate-800'>About Jobify: Your Job Search Made Simple</h1>
      <p className=' text-slate-700'>

        Jobify is more than just a job board - it's your one-stop shop for finding your dream career. We believe that searching for a new opportunity should be an exciting and empowering experience, not a frustrating one.

      </p>

      <p className='text-xl text-slate-700'>
        Here's what makes Jobify unique:
      </p>
      <ul className='ml-5 list-disc'>
        <li className=' text-slate-700'>
          Smart & Simple Search: We go beyond basic keyword searches. Our intelligent filters and advanced matching algorithms ensure you only see relevant and interesting job opportunities.

        </li>
        <li className=' text-slate-700'>

          Diverse & Comprehensive Listings: From entry-level positions to executive roles, we offer a wide array of jobs across all industries and locations. You'll find everything from tech and finance to healthcare and hospitality.
        </li>
        <li className=' text-slate-700'>
          Employer Profiles & Insights: Get a glimpse into the companies you're interested in with detailed employer profiles. Learn about their culture, values, and benefits before applying.
        </li>
        <li className=' text-slate-700'>
          User-Friendly Interface: Our intuitive design makes it easy to browse jobs, save your favorites, and track your applications.
        </li>
        <li className=' text-slate-700'>
          Focus on Career Growth: We offer career resources and articles to help you land your next job, negotiate salaries, and advance your career.
        </li>
      </ul>

      <p className=' text-xl text-slate-700'>
        Our mission is to connect talented individuals with exciting opportunities. We're committed to providing:
      </p>
      <ul className='ml-5 list-disc'>
        <li className=' text-slate-700'>
          A seamless and efficient job search experience for candidates.
        </li>
        <li className=' text-slate-700'>
          A platform for employers to reach qualified and motivated job seekers.
        </li>
        <li className=' text-slate-700'>
          A supportive community for career growth and development.
        </li>
      </ul>
      <p className=' text-xl text-slate-700'>
        Join Jobify today and take control of your career journey!
      </p>
    </div>
  )
}
