import {
    Navigate,
    Outlet
} from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = ({redirectTo, ...data}) => {
    const { isLoggedIn } = useSelector(state => state.user);

    return (isLoggedIn ? <Outlet data={data} /> : <Navigate to={redirectTo} /> );
}

export default PrivateRoutes;