import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import { signInStart, signInSuccess } from '../redux/userSlice';
import { refreshURL } from '../api/urls';

const useRefreshToken = () => {
    // const dispatch = useDispatch();

    const refresh = async () => {
        // dispatch(signInStart());
        const response = await axios.get(refreshURL, {
            // withCredentials: true
        });
        console.log(response);
        // dispatch(signInSuccess(response.data?.accesToken));
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
