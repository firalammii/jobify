import axios from 'axios';
import { BASE_URL } from './axios';

const url = `${BASE_URL}/jobs`;

export const fetchJobs = (accessToken) => axios.get(url, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const handleSearchJob = (searchKey, accessToken) => axios.get(`${url}/search?searchKey=${searchKey}`, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const createJob = (job, accessToken) => axios.post(url, job, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const updateJob = (id, updateData, accessToken) => axios.put(`${url}/${id}`, updateData, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const deleteJob = (id, accessToken) => axios.delete(`${url}/${id}`, { headers: { "Authorization": `Bearer ${accessToken}` } });


export const complexFilterJobs = (filterCondns, query, accessToken,) => axios.post(`${url}/complex-filter?limit=${query?.limit}&page=${query?.page}`, filterCondns, { headers: { "Authorization": `Bearer ${accessToken}` } });
