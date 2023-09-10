import React from 'react';

function Like({ element, onLikeToggle }) {
    return (
        <i
            onClick={() => onLikeToggle(element)}
            className={`fa fa-heart${element.liked ? '' : '-o'}`}
            aria-hidden='true'
            style={{
                cursor: 'pointer'
            }}
        ></i>
    );
}

export default Like;
