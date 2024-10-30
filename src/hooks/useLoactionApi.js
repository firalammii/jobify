import React, { useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import { countriesURL } from '../api/urls';

const useLoactionApi = () => {
	const [country, setCountry] = useState([]);
	const axios = useAxiosPrivate();
	const getAllCountries = async () => {
		try {
			const { error, msg, data } = await axios.get(countriesURL);
			console.log('====================================');
			console.log(error);
			console.log('====================================');


		} catch (error) {
			console.error(error);
		}
	};
	return getAllCountries;
};

export default useLoactionApi;