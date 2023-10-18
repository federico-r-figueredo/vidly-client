import React, { Component } from 'react';
import TableHeader from './common/TableHeader';
import TableBody from './common/TableBody';
import Table from './common/Table';
import Like from './common/Like';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
    columns = [
        {
            path: 'title',
            label: 'Title',
            iconType: 'alpha',
            width: '20%',
            content: (movie, _) => (
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            )
        },
        {
            path: 'genre.name',
            label: 'Genre',
            iconType: 'alpha',
            width: '20%',
            content: (movie, column) => _.get(movie, column.path)
        },
        {
            path: 'numberInStock',
            label: 'Stock',
            iconType: 'numeric',
            width: '15%',
            content: (movie, _) => movie.numberInStock
        },
        {
            path: 'dailyRentalRate',
            label: 'Rate',
            iconType: 'numeric',
            width: '15%',
            content: (movie, _) => movie.dailyRentalRate
        },
        {
            key: 'like',
            width: '5%',
            content: (movie, _) => (
                <Like
                    liked={movie.liked}
                    onLikeToggle={() => this.props.onLike(movie)}
                />
            )
        },
        {
            key: 'delete',
            width: '20%',
            content: (movie, _) => (
                <button
                    onClick={() => this.props.onDelete(movie._id)}
                    className='btn btn-danger'
                >
                    Delete
                </button>
            )
        }
    ];

    render() {
        const { sortColumn, onSort, movies, onLike, onDelete } = this.props;
        return (
            <Table>
                <TableHeader
                    columns={this.columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
                <TableBody
                    items={movies}
                    columns={this.columns}
                    onLike={onLike}
                    onDelete={onDelete}
                />
            </Table>
        );
    }
}

export default MoviesTable;
