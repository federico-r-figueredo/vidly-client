import React from 'react';

function Like({ liked, onLikeToggle }) {
    return (
        <i
            onClick={() => onLikeToggle()}
            className={`fa fa-heart${liked ? '' : '-o'}`}
            aria-hidden='true'
            style={{
                cursor: 'pointer'
            }}
        ></i>
    );
}

export default Like;
