import React, { Component } from 'react';
import TableHeader from './common/TableHeader';
import TableBody from './common/TableBody';
import Table from './common/Table';
import Like from './common/Like';

class MoviesTable extends Component {
    columns = [
        { path: 'title', label: 'Title', iconType: 'alpha', width: '20%' },
        {
            path: 'genre.name',
            label: 'Genre',
            iconType: 'alpha',
            width: '20%'
        },
        {
            path: 'numberInStock',
            label: 'Stock',
            iconType: 'numeric',
            width: '15%'
        },
        {
            path: 'dailyRentalRate',
            label: 'Rate',
            iconType: 'numeric',
            width: '15%'
        },
        {
            key: 'like',
            width: '5%',
            content: (movie) => (
                <Like
                    liked={movie.liked}
                    onLikeToggle={() => this.props.onLike(movie)}
                />
            )
        },
        {
            key: 'delete',
            width: '20%',
            content: (movie) => (
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
