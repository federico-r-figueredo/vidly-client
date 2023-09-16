import React, { Component } from 'react';

class TableHeader extends Component {
    raiseSort(path) {
        const sortColumn = { ...this.props.sortColumn };
        if (path === sortColumn.path) {
            sortColumn.ascOrder = !sortColumn.ascOrder;
        } else {
            sortColumn.path = path;
            sortColumn.ascOrder = true;
        }
        this.props.onSort(sortColumn);
    }

    calcSortOrderIcon(column) {
        return this.props.sortColumn.path === column.path &&
            !this.props.sortColumn.ascOrder
            ? 'desc'
            : 'asc';
    }

    render() {
        return (
            <thead>
                <tr>
                    {this.props.columns.map((column) => (
                        <th
                            scope='col'
                            key={column.path || column.key}
                            className='text-center'
                            style={{ width: column.width }}
                        >
                            {column.path && (
                                <a
                                    className='text-reset text-decoration-none'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => this.raiseSort(column.path)}
                                >
                                    {column.label}
                                    <i
                                        className={`fa fa-sort-${
                                            column.iconType
                                        }-${this.calcSortOrderIcon(
                                            column
                                        )} ml-1`}
                                        aria-hidden='true'
                                    ></i>
                                </a>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;
