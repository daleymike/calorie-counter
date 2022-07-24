import React from 'react';
import {useNavigate, Link} from 'react-router-dom'
import {
    useSelector,
    useDispatch
} from 'react-redux';

import { logout } from '../state/reducers/userReducer';

const NavBar = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.user);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 pt-4 d-flex justify-content-between align-items-baseline">
            
            <div className='navbar-nav'>
                <p className='navbar-brand mb-0 h1'>Calorie Coutner</p>
            </div>
            {isLoggedIn ? 
                    <div className='navbar-nav'>
                        <div className='nav-item' ><Link className='nav-link' to={"/user/dashboard"}><p>Home</p></Link></div>
                        <div className='nav-item' ><Link className='nav-link' to={"/user/recipes/:user_id"}><p>My Recipes</p></Link></div>
                        <div className='nav-item' ><Link className='nav-link' to={"/user/recipes/saved/:user_id"}><p>My Saved Recipes</p></Link></div>
                        <div className='nav-item' ><Link className='nav-link' to={"/user/logs/:user_id"}><p>My Logs</p></Link></div>
                        <div className='nav-item' ><Link className='nav-link' to={"/user/recipes/create"}><p>Add Recipe</p></Link></div>
                        <div className='nav-item' ><button onClick={() => dispatch(logout())} className='btn nav-link'>Logout</button></div>
                      </div>:''}
                

           
        </nav>
    )
};

export default NavBar;