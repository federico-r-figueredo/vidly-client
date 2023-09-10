import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
    state = {
        movies: getMovies()
    };

    removeMovie = (id) => {
        this.setState({
            movies: this.state.movies.filter((x) => x._id !== id)
        });
    };

    render() {
        return (
            <div className='card mt-5'>
                <div className='card-header'>
                    {this.state.movies.length === 0 ? (
                        <span>There are no movies in the database</span>
                    ) : (
                        <span>
                            Showing {this.state.movies.length} movies in the
                            database
                        </span>
                    )}
                </div>
                <div className='card-body'>
                    {this.state.movies.length === 0 ? null : (
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Title</th>
                                    <th scope='col'>Genre</th>
                                    <th scope='col'>Stock</th>
                                    <th scope='col'>Rate</th>
                                    <th scope='col'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.movies.map((movie, index) => (
                                    <tr key={movie._id}>
                                        <th scope='row'>{index}</th>
                                        <td>{movie.title}</td>
                                        <td>{movie.genre.name}</td>
                                        <td>{movie.numberInStock}</td>
                                        <td>{movie.dailyRentalRate}</td>
                                        <td className='text-center'>
                                            <button
                                                onClick={() =>
                                                    this.removeMovie(movie._id)
                                                }
                                                className='btn btn-danger'
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        );
    }
}

export default Movies;
