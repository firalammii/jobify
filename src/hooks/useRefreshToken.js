import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import { signInStart, signInSuccess } from '../redux/userSlice';

const useRefreshToken = () => {
    // const dispatch = useDispatch();

    const refresh = async () => {
        // dispatch(signInStart());
        const response = await axios.get('/api/refresh', {
            // withCredentials: true
        });
        console.log(response);
        // dispatch(signInSuccess(response.data?.accesToken));
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
