import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Autocomplete, Box, Button, TextField } from '@mui/material';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { JobInputArray } from '../data/formData';

const Form = ({ initials, validation, handleFormSubmit }) => {
	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={initials}
			validationSchema={validation}
		>
			{({ values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset }) => (
				<form onSubmit={handleSubmit}>
					<Box>
						<Box>
							{
								JobInputArray.map(({ name, label, type, options }) => {
									if (type === 'select') {
										return (
											<Autocomplete
												options={options}
												renderInput={(params) => <TextField {...params} label={label} />}
											/>
										);
									} else if (type === 'date') {
										return (
											<Box>
												<LocalizationProvider dateAdapter={AdapterDayjs}>
													<DemoContainer components={['DatePicker', 'DatePicker']}>
														<DatePicker
															label={label}
														// value={values[name]}
														// onChange={handleChange}
														// onChange={(newValue) => setValue(newValue)}
														/>
													</DemoContainer>
												</LocalizationProvider>
											</Box>
										);
									} else
										return (
											<TextField
												name={name}
												label={label}
												type={type}
												value={values[name]}
												onChange={handleChange}
												onBlur={handleBlur}
												error={Boolean(touched[name]) && Boolean(errors[name])}
												helperText={touched[name] && errors[name]}
												fullWidth
											/>
										);
								})
							}
						</Box>

						<Box>
							<Button variant='contained' fullWidth type='submit'>Submit</Button>
							<Button fullWidth type='button'>Cancel</Button>
						</Box>
					</Box>
				</form>
			)}
		</Formik>
	);
};

export default Form;