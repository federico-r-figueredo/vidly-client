import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from './components/Main';
import NavBar from './components/common/NavBar';
import Container from './components/common/Container';
import Movies from './components/Movies';
import Movie from './components/Movie';
import NotFound from './components/common/NotFound';
import Home from './components/Home';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = {};
    render() {
        return (
            <Fragment>
                <NavBar appName={'Vidly'} />
                <Main>
                    <Container>
                        <Switch>
                            <Route path='/movies/:id' component={Movie} />
                            <Route path='/movies' component={Movies} />
                            <Route path='/customers' component={Customers} />
                            <Route path='/rentals' component={Rentals} />
                            <Route path='/login' component={LoginForm} />
                            <Route path='/not-found' component={NotFound} />
                            <Route path='/' exact component={Home} />
                            <Redirect to='/not-found' />
                        </Switch>
                    </Container>
                </Main>
            </Fragment>
        );
    }
}

export default App;
