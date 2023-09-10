import React, { Component, Fragment } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/Like';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';

class Movies extends Component {
    state = {
        movies: [],
        pagesCount: 0,
        pageSize: 4,
        currentPage: 1
    };

    constructor() {
        super();
        this.state.movies = getMovies();
        this.state.pagesCount = this.calcPagesCount();
    }

    removeMovie = (id) => {
        const movies = this.state.movies.filter((x) => x._id !== id);
        const pagesCount = this.calcPagesCount(movies);
        const currentPage =
            pagesCount !== this.state.pagesCount &&
            this.state.currentPage === this.state.pagesCount
                ? pagesCount
                : this.state.currentPage;
        this.setState({ pagesCount, movies, currentPage });
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movie };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        });
    };

    calcPagesCount(movies = this.state.movies) {
        return Math.ceil(movies.length / this.state.pageSize);
    }

    render() {
        const { length: count } = this.state.movies;
        const { pagesCount, movies, currentPage, pageSize } = this.state;
        const paginatedMovies = paginate(movies, currentPage, pageSize);
        return (
            <div className='card mt-5'>
                <div className='card-body'>
                    {count === 0 ? (
                        <span>There are no movies in the database</span>
                    ) : (
                        <Fragment>
                            <span>Showing {count} movies in the database</span>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Title</th>
                                        <th scope='col'>Genre</th>
                                        <th scope='col'>Stock</th>
                                        <th scope='col'>Rate</th>
                                        <th scope='col'></th>
                                        <th scope='col'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedMovies.map((movie) => (
                                        <tr key={movie._id}>
                                            <th scope='row'>
                                                {paginatedMovies.indexOf(
                                                    movie
                                                ) + 1}
                                            </th>
                                            <td>{movie.title}</td>
                                            <td>{movie.genre.name}</td>
                                            <td>{movie.numberInStock}</td>
                                            <td>{movie.dailyRentalRate}</td>
                                            <td>
                                                <Like
                                                    element={movie}
                                                    onLikeToggle={
                                                        this.handleLike
                                                    }
                                                />
                                            </td>
                                            <td className='text-center'>
                                                <button
                                                    onClick={() =>
                                                        this.removeMovie(
                                                            movie._id
                                                        )
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
                            <Pagination
                                pagesCount={pagesCount}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange}
                            />
                        </Fragment>
                    )}
                </div>
            </div>
        );
    }
}

export default Movies;
