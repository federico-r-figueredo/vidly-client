import React from 'react';

const styles = {
    cursor: 'pointer'
};

function ListGroup({
    items,
    selectedItem,
    onItemSelect,
    textProperty,
    valueProperty
}) {
    return (
        <ul className='list-group'>
            {items.map((item) => (
                <li
                    key={item[valueProperty]}
                    className={`list-group-item ${
                        selectedItem === item ? 'active' : ''
                    }`}
                    style={styles}
                    onClick={() => onItemSelect(item)}
                >
                    {item[textProperty]}
                </li>
            ))}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
};

export default ListGroup;
