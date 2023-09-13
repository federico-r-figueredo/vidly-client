import React from 'react';

function NavBar({ appName }) {
    return (
        <nav className='navbar navbar-expand-md navbar-dark bg-primary'>
            <a className='navbar-brand' href='#'>
                {appName}
            </a>
        </nav>
    );
}

export default NavBar;
