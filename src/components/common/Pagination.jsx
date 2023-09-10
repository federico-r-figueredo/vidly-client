import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    cursor: 'pointer'
};

function Pagination({ pagesCount, currentPage, onPageChange }) {
    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => ++i);
    return (
        <nav aria-label='Page navigation example'>
            <ul className='pagination justify-content-center'>
                <li
                    className={`page-item ${
                        currentPage === 1 ? 'disabled' : ''
                    }`}
                >
                    <a
                        className='page-link'
                        style={styles}
                        onClick={() => onPageChange(--currentPage)}
                    >
                        <span aria-hidden='true'>&laquo;</span>
                    </a>
                </li>
                {pages.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${
                            page === currentPage ? 'active' : ''
                        }`}
                    >
                        <a
                            className='page-link'
                            onClick={() => onPageChange(page)}
                            style={styles}
                        >
                            {page}
                        </a>
                    </li>
                ))}
                <li
                    className={`page-item ${
                        currentPage === pagesCount ? 'disabled' : ''
                    }`}
                >
                    <a
                        className='page-link'
                        onClick={() => onPageChange(++currentPage)}
                        style={styles}
                    >
                        <span aria-hidden='true'>&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    pagesCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
