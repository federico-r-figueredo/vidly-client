import React, { Component, Fragment } from 'react';
import Main from './components/Main';
import NavBar from './components/NavBar';

class App extends Component {
    state = {};
    render() {
        return (
            <Fragment>
                <NavBar></NavBar>
                <Main></Main>
            </Fragment>
        );
    }
}

export default App;
