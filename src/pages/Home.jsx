import { List, ListItem, Stack, Typography } from '@mui/material';
import React from 'react';

const Home = () => {
	return (
		<Stack spacing={4} pt={3} pb={10}>
			<Typography component={'h2'} variant='h4' sx={{ textTransform: 'capitalize' }}> Jobify... find your job app</Typography>
			<Typography variant='body1' >
				Tired of endless scrolling through irrelevant job listings? Jobify is here to make your job search faster, smarter, and more rewarding.
			</Typography>
			<Typography component={'h3'} variant='h5'>Why Choose Jobify?</Typography>
			<List>
				<ListItem >
					Smart & Personalized Search: No more sifting through mountains of irrelevant jobs. Our advanced search filters and matching algorithms deliver personalized results tailored to your skills and experience.

				</ListItem>
				<ListItem >
					Diverse & Growing Opportunities: Discover a wide range of job opportunities across every industry and location, from entry-level positions to executive roles.
				</ListItem>
				<ListItem >
					Employer Insights & Transparency: Get a clear picture of the companies you're interested in. Explore detailed employer profiles, learn about their culture and benefits, and make informed decisions about your career path.
				</ListItem>
				<ListItem >
					Your Career Compass: Access resources and articles designed to help you land your next job, negotiate salaries, and level up your career skills.
				</ListItem>
				<ListItem >
					Focus on Career Growth: We offer career resources and articles to help you land your next job, negotiate salaries, and advance your career.
				</ListItem>
			</List>

			<p className=' text-xl text-slate-700'>
				Ready to Take Your Career to the Next Level?
			</p>
			<p className=' text-xl text-slate-700'>
				Start exploring opportunities now:
			</p>
			<p className=' text-xl text-slate-700'>
				Browse Jobs
			</p>
		</Stack>
	);
};

export default Home;