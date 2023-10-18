import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({ appName }) {
    return (
        <nav className='navbar navbar-expand-md navbar-dark bg-primary'>
            <NavLink className='navbar-brand' to='/'>
                {appName}
            </NavLink>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/movies'>
                            Movies <span className='sr-only'>(current)</span>
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/customers'>
                            Customers
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/rentals'>
                            Rentals
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/login'>
                            Login
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
