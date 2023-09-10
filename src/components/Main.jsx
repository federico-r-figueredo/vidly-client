import React, { Component } from 'react';
import Movies from './Movies';

class Main extends Component {
    state = {};
    render() {
        return (
            <main role='main' className='container'>
                <Movies></Movies>
            </main>
        );
    }
}

export default Main;
