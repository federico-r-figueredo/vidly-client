import React, { Component, Fragment } from 'react';

class Movie extends Component {
    handleSave = () => {
        this.props.history.push('/movies');
    };

    render() {
        return (
            <Fragment>
                <h1>Movie -- {this.props.match.params.id}</h1>
                <button onClick={this.handleSave}>Save</button>
            </Fragment>
        );
    }
}

export default Movie;
