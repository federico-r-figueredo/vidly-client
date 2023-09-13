import React from 'react';

function Column({ width, children }) {
    return <div className={`col-${width}`}>{children}</div>;
}

export default Column;
