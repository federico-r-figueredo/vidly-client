import React from 'react';
import Container from './common/Container';
import Movies from '../components/Movies';

function Main() {
    return (
        <main role='main'>
            <Container>
                <Movies />
            </Container>
        </main>
    );
}

export default Main;
