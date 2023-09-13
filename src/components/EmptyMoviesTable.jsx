import React from 'react';
import Card from './common/Card';

function EmptyMoviesTable() {
    return (
        <Card cardBodyClasses={'text-center'}>
            <span>There are no movies in the database</span>
        </Card>
    );
}

export default EmptyMoviesTable;
