import React from 'react';
import {useNavigate, Link} from 'react-router-dom'

const NavBar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 pt-4 d-flex justify-content-between align-items-baseline">
            
            <div className='navbar-nav'>
                <p className='navbar-brand mb-0 h1'>Calorie Counter</p>
            </div>
            <div className='navbar-nav'>
              <div className='nav-item' ><Link className='nav-link' to={"/dashboard"}><p>Home</p></Link></div>
              <div className='nav-item' ><Link className='nav-link' to={"/recipes/:user_id"}><p>My Recipes</p></Link></div>
              <div className='nav-item' ><Link className='nav-link' to={"/recipes/saved/:user_id"}><p>My Saved Recipes</p></Link></div>
              <div className='nav-item' ><Link className='nav-link' to={"/logs/:user_id"}><p>My Logs</p></Link></div>
              <div className='nav-item' ><Link className='nav-link' to={"/recipes/create"}><p>Add Recipe</p></Link></div>
              <div className='nav-item' ><Link className='nav-link' to={"/logs/create"}><p>Add Log</p></Link></div>
              <div className='nav-item' ><Link className='nav-link' to={"/logout"}><p>Logout</p></Link></div>
            </div>
                

           
        </nav>
    )
};

export default NavBar;