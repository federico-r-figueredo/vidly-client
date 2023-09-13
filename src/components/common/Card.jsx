import React from 'react';

function Card({ children, cardClasses, cardBodyClasses }) {
    return (
        <div className={`card ${cardClasses}`}>
            <div className={`card-body ${cardBodyClasses}`}>{children}</div>
        </div>
    );
}

export default Card;
