import axios from 'axios';
import { BASE_URL } from './axios';

const url = `${BASE_URL}/companies`;

export const fetchCompanies = (accessToken) => axios.get(url, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const handleSearchCompany = (searchKey, accessToken) => axios.get(`${url}/search?searchKey=${searchKey}`, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const createCompany = (company, accessToken) => axios.post(url, company,
	{ headers: { "Authorization": `Bearer ${accessToken}`, "content-type": "multipart/form-data" } }
);
export const updateCompany = (id, updateData, accessToken) => axios.put(`${url}/${id}`, updateData, { headers: { "Authorization": `Bearer ${accessToken}` } });
export const deleteCompany = (id, accessToken) => axios.delete(`${url}/${id}`, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const complexFilterCompanies = (filterCondns, query, accessToken) => axios.post(`${url}/complex-filter?limit=${query?.limit}&page=${query?.page}`, filterCondns, { headers: { "Authorization": `Bearer ${accessToken}` } });
