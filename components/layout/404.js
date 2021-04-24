import React from 'react';
import styled from '@emotion/styled';

const ErroDiv = styled.div`
    max-width: 600px;
    margin: auto auto;
    align-items: center;
    text-align: center;

    h1{
        font-size: 10rem;
        font-weight: bold;
        margin-bottom: 0;
    }

    p{
        font-size: 1.9rem;
    }

    a{
        font-size: 1.6rem;
        text-decoration: none;
    }
`;

const Error404 = () => {
    return (  
        <>
            <ErroDiv>
                <h1>404</h1>
                <p>Oops... Algo salio mal</p>

                <a href="/" >Regresar al Inicio</a>
            </ErroDiv>
        </>
    );
}

export default Error404;