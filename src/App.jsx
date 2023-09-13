import React, { Component, Fragment } from 'react';
import Main from './components/Main';
import NavBar from './components/common/NavBar';

class App extends Component {
    state = {};
    render() {
        return (
            <Fragment>
                <NavBar appName={'Vidly'} />
                <Main />
            </Fragment>
        );
    }
}

export default App;
