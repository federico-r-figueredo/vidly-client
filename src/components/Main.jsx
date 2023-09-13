import React, { Component } from 'react';
import Movies from './Movies';

class Main extends Component {
    render() {
        return (
            <main role='main' className='container mt-5'>
                <Movies />
            </main>
        );
    }
}

export default Main;
