import React from 'react';
import Like from './common/Like';

function MoviesTable({ movies, handleLike, removeMovie }) {
    return (
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
                {movies.map((movie) => (
                    <tr key={movie._id}>
                        <th scope='row'>{movies.indexOf(movie) + 1}</th>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                            <Like
                                liked={movie.liked}
                                onLikeToggle={() => handleLike(movie)}
                            />
                        </td>
                        <td className='text-center'>
                            <button
                                onClick={() => removeMovie(movie._id)}
                                className='btn btn-danger'
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MoviesTable;
