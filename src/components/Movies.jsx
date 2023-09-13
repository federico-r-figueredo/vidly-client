import React, { Component, Fragment } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './common/Like';
import Pagination from './common/Pagination';
import { paginate as paginateMovies } from '../utils/paginate';
import ListGroup from './ListGroup';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        selectedGenre: null
    };

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    componentDidMount() {
        const genres = [{ name: 'All Genres' }, ...getGenres()];
        this.setState({
            movies: getMovies(),
            genres,
            selectedGenre: genres[0]
        });
    }

    removeMovie = (id) => {
        const movies = this.state.movies.filter((x) => x._id !== id);
        this.setState({ movies });
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

    calcPagesCount(movies) {
        return Math.ceil(movies.length / this.state.pageSize);
    }

    calcCurrentPage(pagesCount) {
        return pagesCount < this.state.currentPage
            ? pagesCount
            : this.state.currentPage;
    }

    filterMovies() {
        return this.state.selectedGenre && this.state.selectedGenre._id
            ? this.state.movies.filter(
                  (movie) => movie.genre._id === this.state.selectedGenre._id
              )
            : this.state.movies;
    }

    render() {
        console.log('render!');
        if (!this.state.movies.length)
            return (
                <div className='card'>
                    <div className='card-body text-center'>
                        <span>There are no movies in the database</span>
                    </div>
                </div>
            );

        const { genres, pageSize, selectedGenre } = this.state;
        const filteredMovies = this.filterMovies();
        const pagesCount = this.calcPagesCount(filteredMovies);
        const currentPage = this.calcCurrentPage(pagesCount);
        const paginatedMovies = paginateMovies(
            filteredMovies,
            currentPage,
            pageSize
        );
        return (
            <div className='row'>
                <div className='col-2'>
                    <ListGroup
                        items={genres}
                        selectedItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className='col-10'>
                    <div className='card'>
                        <div className='card-body'>
                            <span>
                                Showing {filteredMovies.length} movies in the
                                database
                            </span>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Movies;
