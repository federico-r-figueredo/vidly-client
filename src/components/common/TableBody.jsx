import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
    createKey = (item, column) => item._id + (column.path || column.key);

    render() {
        const { items, columns } = this.props;
        return (
            <tbody>
                {items.map((item) => (
                    <tr key={item._id} className='text-center'>
                        {columns.map((column) => (
                            <td key={this.createKey(item, column)}>
                                {column.content(item, column)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableBody;
