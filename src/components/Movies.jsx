import React, { Component, Fragment } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './MoviesTable';
import Pagination from './common/Pagination';
import { paginate as paginateMovies } from '../utils/paginate';
import ListGroup from './ListGroup';
import MoviesCount from './MoviesCount';
import Card from './common/Card';
import Column from './common/Column';
import Row from './common/Row';
import EmptyMoviesTable from './EmptyMoviesTable';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        selectedGenre: null
    };
    componentDidMount() {
        const genres = [{ _id: '*', name: 'All Genres' }, ...getGenres()];
        this.setState({
            movies: getMovies(),
            genres,
            selectedGenre: genres[0]
        });
    }

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleRemoveMovie = (id) => {
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

    filterMovies() {
        return this.state.selectedGenre && this.state.selectedGenre._id !== '*'
            ? this.state.movies.filter(
                  (movie) => movie.genre._id === this.state.selectedGenre._id
              )
            : this.state.movies;
    }

    calcPagesCount(movies) {
        return Math.ceil(movies.length / this.state.pageSize);
    }

    calcCurrentPage(pagesCount) {
        return pagesCount < this.state.currentPage
            ? pagesCount
            : this.state.currentPage;
    }

    computeDerivedState() {
        const { pageSize } = this.state;
        const filteredMovies = this.filterMovies();
        const pagesCount = this.calcPagesCount(filteredMovies);
        const currentPage = this.calcCurrentPage(pagesCount);
        const paginatedMovies = paginateMovies(
            filteredMovies,
            currentPage,
            pageSize
        );

        return {
            filteredMovies,
            pagesCount,
            currentPage,
            paginatedMovies
        };
    }

    render() {
        console.log('render!');
        if (!this.state.movies.length) return <EmptyMoviesTable />;

        const { genres, selectedGenre } = this.state;
        const { filteredMovies, pagesCount, currentPage, paginatedMovies } =
            this.computeDerivedState();
        return (
            <Row>
                <Column width={2}>
                    <ListGroup
                        items={genres}
                        selectedItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </Column>
                <Column width={10}>
                    <Card>
                        <MoviesCount moviesCount={filteredMovies.length} />
                        <MoviesTable
                            movies={paginatedMovies}
                            handleLike={this.handleLike}
                            removeMovie={this.handleRemoveMovie}
                        />
                        <Pagination
                            pagesCount={pagesCount}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </Card>
                </Column>
            </Row>
        );
    }
}

export default Movies;
