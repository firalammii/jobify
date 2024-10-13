import axios from 'axios';
import { BASE_URL } from './axios';
const url = `${BASE_URL}/users`;


export const login = async (credentials, accessToken) => await axios.post(`${BASE_URL}/auth/login`, credentials, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const logout = async (accessToken) => await axios.get(`${BASE_URL}/auth/login`, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const fetchUsers = async (accessToken) => await axios.get(url, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const createUser = (user, accessToken) => axios.post(url, user, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const updateUser = (id, nuser, accessToken) => axios.put(`${url}/${id}`, nuser, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const updateProfile = (id, nuser, accessToken) => axios.put(`${url}/update/profile/${id}`, nuser, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const updateUserPp = (id, nuser, accessToken) => axios.put(`${url}/update/userpp/${id}`, nuser, { headers: { "Authorization": `Bearer ${accessToken}` } });

export const deleteUser = (id, accessToken) => axios.delete(`${url}/${id}`, { headers: { "Authorization": `Bearer ${accessToken}` } });