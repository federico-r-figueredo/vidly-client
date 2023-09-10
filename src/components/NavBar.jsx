import React, { Component } from 'react';

class NavBar extends Component {
    state = {};
    render() {
        return (
            <nav className='navbar navbar-expand-md navbar-dark bg-primary'>
                <a className='navbar-brand' href='#'>
                    Vidly
                </a>
            </nav>
        );
    }
}

export default NavBar;
