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
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        selectedGenre: null,
        sortColumn: { path: 'title', ascOrder: true }
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

    handleDelete = (id) => {
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

    handleSort = (sortColumn) => {
        this.setState({
            sortColumn
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

    // TODO: Improve this mess
    sortMovies(movies) {
        return [...movies].sort((a, b) => {
            const valueA = _.get(a, this.state.sortColumn.path);
            const valueB = _.get(b, this.state.sortColumn.path);
            if (
                this.state.sortColumn.ascOrder
                    ? valueA < valueB
                    : valueA > valueB
            ) {
                return -1;
            }

            if (
                this.state.sortColumn.ascOrder
                    ? valueA > valueB
                    : valueA < valueB
            ) {
                return 1;
            }

            return 0;
        });
    }

    computeDerivedState() {
        const { pageSize } = this.state;
        const filteredMovies = this.filterMovies();
        const sortedMovies = this.sortMovies(filteredMovies);
        const pagesCount = this.calcPagesCount(filteredMovies);
        const currentPage = this.calcCurrentPage(pagesCount);
        const paginatedMovies = paginateMovies(
            sortedMovies,
            currentPage,
            pageSize
        );

        return {
            sortedMovies,
            pagesCount,
            currentPage,
            paginatedMovies
        };
    }

    render() {
        console.log('render!');
        if (!this.state.movies.length) return <EmptyMoviesTable />;

        const { genres, selectedGenre, sortColumn } = this.state;
        const { sortedMovies, pagesCount, currentPage, paginatedMovies } =
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
                        <MoviesCount moviesCount={sortedMovies.length} />
                        <MoviesTable
                            movies={paginatedMovies}
                            sortColumn={sortColumn}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
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
