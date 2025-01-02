import axios from "axios";
import { URL } from "./urls";
import { signOut } from "./api/auth_api";
import { store } from "../redux/store";

// const BASE_URL = 'http://localhost:3500';
// const BASE_URL = 'https://jobify-5f6w.onrender.com';
const BASE_URL = 'https://jobify-api-hamn.onrender.com';


const axiosDef = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

const axiosInterceptor = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json', },
    withCredentials: true,

});

axiosInterceptor.interceptors.request.use((config) => {
    if (!config.headers.Authorization || !config) {
        const authData = JSON.parse(localStorage.getItem('authData'));
        config.headers['Authorization'] = `Bearer ${authData?.accessToken}`;
    }
    return config;
}, (error) => Promise.reject(error));

axiosInterceptor.interceptors.response.use(
    response => response,
    async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            try {
                const { data } = await axiosInterceptor.get(URL.refreshURL);
                localStorage.setItem('authData', JSON.stringify(data));
                prevRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                return axiosInterceptor(prevRequest);
            } catch (error) {
                console.error(error);
                if (error?.response?.status === 401) {
                    store.dispatch(signOut());
                }
            }
        }
        return Promise.reject(error);
    });

export { axiosDef, BASE_URL };
export default axiosInterceptor;