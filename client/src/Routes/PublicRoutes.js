import {
    Navigate,
    Outlet
} from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoutes = ({redirectTo, ...data}) => {
    const { isLoggedIn } = useSelector(state => state.user);

    return (isLoggedIn ? <Navigate to={redirectTo} /> : <Outlet data={data} /> );
}

export default PublicRoutes;